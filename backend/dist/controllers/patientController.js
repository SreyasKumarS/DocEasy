import PatientService from '../services/patientService.js';
// Register Patient
const registerPatient = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        await PatientService.registerPatient(name, email, password);
        return res.status(201).json({ message: 'OTP sent to your email' });
    }
    catch (error) {
        next(error);
    }
};
// Verify OTP
const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;
    try {
        await PatientService.verifyOtp(email, otp);
        return res.status(201).json({ message: 'Patient verified successfully' });
    }
    catch (error) {
        next(error);
    }
};
// Resend OTP
const resendOtp = async (req, res, next) => {
    const { email } = req.body;
    try {
        await PatientService.resendOtp(email);
        return res.status(200).json({ message: 'OTP resent to your email' });
    }
    catch (error) {
        next(error);
    }
};
const loginPatient = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const result = await PatientService.loginPatient(email, password, res);
        return res.status(200).json({
            message: 'Login successful',
            patient: result.patient,
        });
    }
    catch (error) {
        next(error);
    }
};
// Logout Patient
const logoutPatient = async (req, res, next) => {
    try {
        await PatientService.logoutPatient(res);
        return res.status(200).json({ message: 'Logout successful' });
    }
    catch (error) {
        next(error);
    }
};
const sendResetOtp = async (req, res, next) => {
    const { email } = req.body;
    try {
        await PatientService.sendResetOtp(email);
        return res.status(200).json({ message: 'OTP sent to your email' });
    }
    catch (error) {
        console.error('Error in resendOtp controller:', error);
        if (error instanceof Error) {
            console.error('Error message:', error.message);
            return res.status(500).json({ message: error.message });
        }
        else {
            console.error('Unknown error in resendOtp controller:', error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};
const resetPassword = async (req, res, next) => {
    const { email, newPassword, confirmPassword } = req.body;
    if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
        await PatientService.resetPassword(email, newPassword);
        return res.status(200).json({ message: 'Password reset successful' });
    }
    catch (error) {
        console.error('Error resetting password:', error);
        next(error);
    }
};
export { registerPatient, verifyOtp, resendOtp, loginPatient, logoutPatient, sendResetOtp, resetPassword };
