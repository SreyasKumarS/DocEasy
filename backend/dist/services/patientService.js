import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import PatientRepository from '../repositories/patientRespository.js';
import patientGenerateToken from '../utils/patientGenerateToken.js';
class PatientService {
    async registerPatient(name, email, password) {
        const existingPatient = await PatientRepository.findByEmail(email);
        if (existingPatient) {
            throw new Error('Email already registered');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPatient = {
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
        };
        await PatientRepository.savePatient(newPatient);
        await sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);
    }
    async verifyOtp(email, otp) {
        const patient = await PatientRepository.findByEmail(email);
        if (!patient) {
            throw new Error('Patient not found');
        }
        if (patient.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        if (patient.otpExpires && patient.otpExpires < new Date()) {
            throw new Error('OTP expired');
        }
        patient.isVerified = true;
        await PatientRepository.updatePatient(patient);
    }
    async resendOtp(email) {
        const patient = await PatientRepository.findByEmail(email);
        if (!patient) {
            throw new Error('Patient not found');
        }
        if (patient.isVerified) {
            throw new Error('Patient already verified');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        patient.otp = otp;
        patient.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await PatientRepository.updatePatient(patient);
        await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
    }
    async loginPatient(email, password, res) {
        const patient = await PatientRepository.findByEmail(email);
        if (!patient)
            throw new Error('Invalid email or password');
        const isMatch = await bcrypt.compare(password, patient.password);
        if (!isMatch)
            throw new Error('Invalid email or password');
        if (!patient.isVerified)
            throw new Error('Please verify your email before logging in.');
        const token = patientGenerateToken(res, patient._id.toString());
        return {
            patient: {
                id: patient._id.toString(),
                name: patient.name,
                email: patient.email,
                isVerified: patient.isVerified,
            },
            token,
        };
    }
    async logoutPatient(res) {
        res.clearCookie('token', { httpOnly: true, secure: true });
    }
    async sendResetOtp(email) {
        try {
            const patient = await PatientRepository.findByEmail(email);
            if (!patient) {
                console.error('Patient not found for email:', email);
                throw new Error('Patient not found');
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            patient.otp = otp;
            patient.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
            await PatientRepository.updatePatient(patient);
            await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
        }
        catch (error) {
            console.error('Error in sendResetOtp:', error);
            throw new Error('Internal server error');
        }
    }
    async resetPassword(email, newPassword) {
        const patient = await PatientRepository.findByEmail(email);
        if (!patient) {
            throw new Error('User not found');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        patient.password = hashedPassword;
        await patient.save();
    }
}
export default new PatientService();
