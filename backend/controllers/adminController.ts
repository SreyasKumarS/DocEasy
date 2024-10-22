import { Response, Request, NextFunction } from 'express';
import AdminService from '../services/adminServices.js';

// Verify OTP for Admin
const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, otp } = req.body;
  console.log('hit otp controleer ')
  try {
    await AdminService.verifyOtp(email, otp);
    return res.status(201).json({ message: 'Admin verified successfully' });
  } catch (error) {
    console.error('Error during OTP verification:', error);
    next(error);
  }
};

// Resend OTP for Admin
const resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email } = req.body;
  try {
    await AdminService.resendOtp(email);
    return res.status(200).json({ message: 'OTP resent to your email' });
  } catch (error) {
    next(error);
  }
};

// Login Admin
const loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  console.log('controller hit')
  const { email, password } = req.body;
  try {
    const result = await AdminService.loginAdmin(email, password, res);
    return res.status(200).json({
      message: 'Login successful',
      token: result.token,
      admin: result.admin,
    });
  } catch (error) {
    next(error);
  }
};

// Logout Admin
const logoutAdmin = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await AdminService.logoutAdmin(res);
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

// Send OTP for password reset (Admin)
const sendAdminResetOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email } = req.body;
  try {
    await AdminService.sendResetOtp(email); // Call the AdminService to send OTP
    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error in sendAdminResetOtp controller:', error); // Log the entire error object
    if (error instanceof Error) {
      console.error('Error message:', error.message); // Log specific error details
      return res.status(500).json({ message: error.message });
    } else {
      console.error('Unknown error in sendAdminResetOtp controller:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

// Reset Admin password
const resetAdminPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, newPassword, confirmPassword } = req.body;

  // Check if passwords match
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Update the admin's password using AdminService
    await AdminService.resetPassword(email, newPassword);
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting admin password:', error); // Log the error for debugging
    next(error); // Pass the error to the global error handler
  }
};

export { verifyOtp, resendOtp, loginAdmin, logoutAdmin, sendAdminResetOtp, resetAdminPassword };
