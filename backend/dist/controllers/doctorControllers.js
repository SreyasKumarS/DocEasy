import DoctorService from '../services/doctorServices.js';
// Register Doctor (with medical license upload)
const registerDoctor = async (req, res, next) => {
    // Destructure required properties from the request body
    const { name, email, password, specialization, licenseNumber } = req.body;
    // console.log('Received body:', req.body);
    try {
        // Validate that all required fields are provided
        if (!name || !email || !password || !specialization || !licenseNumber) {
            console.error('Missing required fields');
            return res.status(400).json({ message: 'All fields are required' });
        }
        // Call DoctorService to register the doctor
        await DoctorService.registerDoctor(name, email, password, specialization, licenseNumber);
        return res.status(201).json({ message: 'OTP sent to your email' });
    }
    catch (error) {
        console.error('Error during registration:', error);
        next(error);
    }
};
// Other CRUD functions (similar to the patientController)
const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        await DoctorService.verifyOtp(email, otp);
        return res.status(201).json({ message: 'Doctor verified successfully' });
    }
    catch (error) {
        console.error('Error during OTP verification:', error);
        next(error);
    }
};
const resendOtp = async (req, res, next) => {
    const { email } = req.body;
    try {
        await DoctorService.resendOtp(email);
        return res.status(200).json({ message: 'OTP resent to your email' });
    }
    catch (error) {
        next(error);
    }
};
const loginDoctor = async (req, res, next) => {
    const { email, password } = req.body;
    console.log('Request Body:', req.body, 'got itttttttttttttt'); // Fixed logging
    try {
        const result = await DoctorService.loginDoctor(email, password, res);
        return res.status(200).json({
            message: 'Login successful',
            token: result.token,
            doctor: result.doctor,
        });
    }
    catch (error) {
        next(error);
    }
};
const logoutDoctor = async (req, res, next) => {
    try {
        await DoctorService.logoutDoctor(res);
        return res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        next(error);
    }
};
const sendDoctorResetOtp = async (req, res, next) => {
    const { email } = req.body;
    try {
        await DoctorService.sendResetOtp(email); // Call the DoctorService to send OTP
        return res.status(200).json({ message: 'OTP sent to your email' });
    }
    catch (error) {
        console.error('Error in sendDoctorResetOtp controller:', error); // Log the entire error object
        if (error instanceof Error) {
            console.error('Error message:', error.message); // Log specific error details
            return res.status(500).json({ message: error.message });
        }
        else {
            console.error('Unknown error in sendDoctorResetOtp controller:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
const resetDoctorPassword = async (req, res, next) => {
    const { email, newPassword, confirmPassword } = req.body;
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        // Update the doctor's password using DoctorService
        await DoctorService.resetPassword(email, newPassword);
        return res.status(200).json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.error('Error resetting doctor password:', error); // Log the error for debugging
        next(error); // Pass the error to the global error handler
    }
};
export { registerDoctor, verifyOtp, resendOtp, loginDoctor, logoutDoctor, sendDoctorResetOtp, resetDoctorPassword };
