import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import AdminRepository from '../repositories/adminRespository.js';
import adminGenerateToken from '../utils/adminGenerateToken.js';
class AdminService {
    // Verify OTP for admin
    async verifyOtp(email, otp) {
        console.log('reached service of verify otp');
        const admin = await AdminRepository.findByEmail(email);
        console.log(admin, 'verify ito service admin insole');
        if (!admin) {
            throw new Error('Admin not found');
        }
        if (admin.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        if (admin.otpExpires && admin.otpExpires < new Date()) {
            throw new Error('OTP expired');
        }
        admin.isVerified = true;
        await AdminRepository.updateAdmin(admin);
    }
    // Resend OTP for admin
    async resendOtp(email) {
        const admin = await AdminRepository.findByEmail(email);
        if (!admin) {
            throw new Error('Admin not found');
        }
        if (admin.isVerified) {
            throw new Error('Admin already verified');
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        admin.otp = otp;
        admin.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await AdminRepository.updateAdmin(admin);
        // Resend OTP via email
        await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
    }
    // Admin login
    async loginAdmin(email, password, res) {
        try {
            const admin = await AdminRepository.findByEmail(email);
            if (!admin) {
                console.error('Admin not found:', email);
                throw new Error('Invalid email or password');
            }
            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) {
                console.error('Password mismatch for admin:', email);
                throw new Error('Invalid email or password');
            }
            if (!admin.isVerified) {
                console.error('Admin is not verified:', email);
                throw new Error('Please verify your email before logging in.');
            }
            // Generate the token and set it as a cookie
            const token = adminGenerateToken(res, admin._id.toString());
            return {
                admin: {
                    id: admin._id.toString(),
                    email: admin.email,
                    isVerified: admin.isVerified,
                },
                token,
            };
        }
        catch (error) {
            console.error('Error during admin login:', error); // Log the error
            throw error; // Re-throw the error to be handled by your route
        }
    }
    // Logout admin
    async logoutAdmin(res) {
        res.clearCookie('token', { httpOnly: true, secure: true });
    }
    // Send reset OTP for admin
    async sendResetOtp(email) {
        try {
            const admin = await AdminRepository.findByEmail(email);
            if (!admin) {
                console.error('Admin not found for email:', email);
                throw new Error('Admin not found');
            }
            // Generate OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            admin.otp = otp;
            admin.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // Set OTP expiry
            await AdminRepository.updateAdmin(admin);
            await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
        }
        catch (error) {
            console.error('Error in sendResetOtp for admin:', error);
            throw new Error('Internal server error');
        }
    }
    // Reset admin password
    async resetPassword(email, newPassword) {
        try {
            const admin = await AdminRepository.findByEmail(email);
            if (!admin) {
                throw new Error('Admin not found');
            }
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            admin.password = hashedPassword;
            await admin.save();
        }
        catch (error) {
            console.error('Error in resetPassword for admin:', error);
            throw new Error('Internal server error');
        }
    }
}
export default new AdminService();
