import { Response, Request, NextFunction } from 'express';
import DoctorService from '../services/doctorServices.js';


const registerDoctor = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  console.log('hit multer backend controller')
  const { name, email, password, specialization, licenseNumber } = req.body;

  console.log('Register Doctor request received');
  console.log('Request Body:', req.body); 
  console.log('Uploaded File:', req.file); 
  
  
  const medicalLicense = req.file ? req.file.path : null;

  try {
    
    if (!name || !email || !password || !specialization || !licenseNumber || !medicalLicense) {
      console.error('Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

   
    await DoctorService.registerDoctor(name, email, password, specialization, licenseNumber, medicalLicense);
    return res.status(201).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error during registration:', error);
    next(error);
  }
};

const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  
  const { email, otp } = req.body;
  try {
    await DoctorService.verifyOtp(email, otp);
    return res.status(201).json({ message: 'Doctor verified successfully' });
   
  } catch (error) {
    console.error('Error during OTP verification:', error);
    next(error);
  }
};

const resendOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email } = req.body;
  try {
    await DoctorService.resendOtp(email);
    return res.status(200).json({ message: 'OTP resent to your email' });
  } catch (error) {
    next(error);
  }
};

const loginDoctor = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  
  const { email, password } = req.body;
  console.log('Request Body:', req.body, 'got itttttttttttttt'); 
  try {
    const result = await DoctorService.loginDoctor(email, password, res);
    return res.status(200).json({
      message: 'Login successful',
      token: result.token,
      doctor: result.doctor,
    });
  } catch (error) {
    next(error);
  }
};

const logoutDoctor = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    await DoctorService.logoutDoctor(res);
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    next(error);
  }
};

const sendDoctorResetOtp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email } = req.body;

  try {
    await DoctorService.sendResetOtp(email); 
    return res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    console.error('Error in sendDoctorResetOtp controller:', error);
    if (error instanceof Error) {
        console.error('Error message:', error.message); 
        return res.status(500).json({ message: error.message });
    } else {
        console.error('Unknown error in sendDoctorResetOtp controller:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};


const resetDoctorPassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  const { email, newPassword, confirmPassword } = req.body;
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }
  try {
    await DoctorService.resetPassword(email, newPassword); 
    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Error resetting doctor password:', error);
    next(error); 
  }
};


export { registerDoctor, verifyOtp, resendOtp, loginDoctor, logoutDoctor,sendDoctorResetOtp,resetDoctorPassword };
