import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import DoctorRepository from '../repositories/doctorRespository.js';
import doctorGenerateToken from '../utils/doctorGenerateToken.js';
class DoctorService {
    // Register doctor with medical certificate upload
    async registerDoctor(name, email, password, specialization, // Specialization field included
    licenseNumber) {
        // Check if the doctor already exists based on the provided email
        const existingDoctor = await DoctorRepository.findByEmail(email);
        if (existingDoctor) {
            throw new Error('Email already registered');
        }
        // Generate OTP and expiry time (10-minute window)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create the new doctor object
        const newDoctor = {
            name,
            email,
            password: hashedPassword,
            otp,
            otpExpires,
            specialization, // Save specialization field
            licenseNumber, // Save license number
            isVerified: false // Email verification pending
        };
        // Persist the new doctor to the database
        await DoctorRepository.saveDoctor(newDoctor);
        // Send OTP for email verification
        await sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);
    }
    // Verify OTP for doctor
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
    // Resend OTP for doctor
    async resendOtp(email) {
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
        // Resend OTP via email
        await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
    }
    // Doctor login
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
        // Generate the token and set it as a cookie
        const token = doctorGenerateToken(res, doctor._id.toString());
        return {
            doctor: {
                id: doctor._id.toString(),
                name: doctor.name,
                email: doctor.email,
                isVerified: doctor.isVerified, // Include medical certificate path
            },
            token, // Ensure this is returned
        };
    }
    // Logout doctor
    async logoutDoctor(res) {
        res.clearCookie('token', { httpOnly: true, secure: true });
    }
    // Send reset OTP for doctor
    async sendResetOtp(email) {
        try {
            const doctor = await DoctorRepository.findByEmail(email); // Use DoctorRepository for doctors
            if (!doctor) {
                console.error('Doctor not found for email:', email); // Log email for debugging
                throw new Error('Doctor not found');
            }
            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            doctor.otp = otp;
            doctor.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Set OTP expiry
            await DoctorRepository.updateDoctor(doctor); // Update doctor details
            await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`); // Send OTP email
        }
        catch (error) {
            console.error('Error in sendResetOtp for doctor:', error); // Log full error for better insight
            throw new Error('Internal server error');
        }
    }
    // Reset doctor password
    async resetPassword(email, newPassword) {
        try {
            const doctor = await DoctorRepository.findByEmail(email); // Use DoctorRepository for doctors
            if (!doctor) {
                throw new Error('Doctor not found');
            }
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            doctor.password = hashedPassword; // Save hashed password
            await doctor.save(); // Save updated doctor details
        }
        catch (error) {
            console.error('Error in resetPassword for doctor:', error); // Log error for debugging
            throw new Error('Internal server error');
        }
    }
}
export default new DoctorService();
