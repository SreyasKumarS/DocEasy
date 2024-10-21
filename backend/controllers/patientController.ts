// controllers/patientController.ts


import { Response, Request, NextFunction } from 'express';

import PatientService from '../services/patientService.js'

// Register Patient
const registerPatient = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { name, email, password } = req.body;

  try {
    await PatientService.registerPatient(name, email, password);
    return res.status(201).json({ message: 'OTP sent to your email' });
  } catch (error) {
    next(error);
  }
};

// Verify OTP
const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, otp } = req.body;

  try {
    await PatientService.verifyOtp(email, otp);
    return res.status(201).json({ message: 'Patient verified successfully' });
  } catch (error) {
    next(error);
  }
};

// Resend OTP
const resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email } = req.body;

  try {
    await PatientService.resendOtp(email);
    return res.status(200).json({ message: 'OTP resent to your email' });
  } catch (error) {
    next(error);
  }
};


const loginPatient = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, password } = req.body;

  try {
      const result = await PatientService.loginPatient(email, password, res);
      return res.status(200).json({
          message: 'Login successful',
          token: result.token,
          patient: result.patient,
      });
  } catch (error) {
      next(error);
  }
};


// Logout Patient
const logoutPatient = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await PatientService.logoutPatient(res);  // This should handle clearing the cookie
    return res.status(200).json({ message: 'Logout successful' });  // Ensure you're sending a JSON response
  } catch (error) {
    next(error);
  }
}


const sendResetOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email } = req.body;

  try {
    await PatientService.sendResetOtp(email);
    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error in resendOtp controller:', error); // Log the entire error object
    if (error instanceof Error) {
        console.error('Error message:', error.message); // Log specific error details
        return res.status(500).json({ message: error.message });
    } else {
        console.error('Unknown error in resendOtp controller:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }}
};


// Reset Password (without OTP since it's already verified)
const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    await PatientService.resetPassword(email, newPassword); // Update password only
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting password:', error);
    next(error);
  }
};


export { registerPatient, verifyOtp, resendOtp, loginPatient, logoutPatient,sendResetOtp,resetPassword };









