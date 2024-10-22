import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import DoctorRepository from '../repositories/doctorRespository.js';
import doctorGenerateToken from '../utils/doctorGenerateToken.js';
class DoctorService {
    async registerDoctor(name, email, password, specialization, licenseNumber, medicalLicense) {
        const existingDoctor = await DoctorRepository.findByEmail(email);
        if (existingDoctor) {
            throw new Error('Email already registered');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = {
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
            specialization,
            licenseNumber,
            medicalLicense,
            isVerified: false
        };
        await DoctorRepository.saveDoctor(newDoctor);
        await sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);
    }
    async verifyOtp(email, otp) {
        const doctor = await DoctorRepository.findByEmail(email);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        if (doctor.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        if (doctor.otpExpires && doctor.otpExpires < new Date()) {
            throw new Error('OTP expired');
        }
        doctor.isVerified = true;
        await DoctorRepository.updateDoctor(doctor);
    }
    async resendOtp(email) {
        console.log('entered doc service otp area');
        const doctor = await DoctorRepository.findByEmail(email);
        if (!doctor) {
            throw new Error('Doctor not found');
        }
        if (doctor.isVerified) {
            throw new Error('Doctor already verified');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        doctor.otp = otp;
        doctor.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await DoctorRepository.updateDoctor(doctor);
        await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
    }
    async loginDoctor(email, password, res) {
        console.log('eneter dc service');
        const doctor = await DoctorRepository.findByEmail(email);
        if (!doctor)
            throw new Error('Invalid email or password');
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch)
            throw new Error('Invalid email or password');
        if (!doctor.isVerified)
            throw new Error('Please verify your email before logging in.');
        const token = doctorGenerateToken(res, doctor._id.toString());
        return {
            doctor: {
                id: doctor._id.toString(),
                name: doctor.name,
                email: doctor.email,
                isVerified: doctor.isVerified,
            },
            token,
        };
    }
    async logoutDoctor(res) {
        res.clearCookie('token', { httpOnly: true, secure: true });
    }
    async sendResetOtp(email) {
        try {
            const doctor = await DoctorRepository.findByEmail(email);
            if (!doctor) {
                console.error('Doctor not found for email:', email);
                throw new Error('Doctor not found');
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            doctor.otp = otp;
            doctor.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
            await DoctorRepository.updateDoctor(doctor);
            await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
        }
        catch (error) {
            console.error('Error in sendResetOtp for doctor:', error);
            throw new Error('Internal server error');
        }
    }
    async resetPassword(email, newPassword) {
        try {
            const doctor = await DoctorRepository.findByEmail(email);
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            doctor.password = hashedPassword;
            await doctor.save();
        }
        catch (error) {
            console.error('Error in resetPassword for doctor:', error);
            throw new Error('Internal server error');
        }
    }
}
export default new DoctorService();
