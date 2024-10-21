// services/patientService.ts
import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import PatientRepository from '../repositories/patientRespository.js';
import patientGenerateToken from '../utils/patientGenerateToken.js'

class PatientService {
  async registerPatient(name: string, email: string, password: string) {
    const existingPatient = await PatientRepository.findByEmail(email);

    if (existingPatient) {
      throw new Error('Email already registered');
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const hashedPassword = await bcrypt.hash(password, 10);

    const newPatient = {
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    };

    await PatientRepository.savePatient(newPatient);

    // Send OTP via email
    await sendEmail(email, 'OTP Verification', `Your OTP is ${otp}`);
  }

  async verifyOtp(email: string, otp: string) {
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

  async resendOtp(email: string) {
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

  

// PatientService.ts

async loginPatient(email: string, password: string, res: Response): Promise<{
  patient: {
      id: string; // This remains a string type
      name: string;
      email: string;
      isVerified: boolean;
  };
  token: string;
}> {
  const patient = await PatientRepository.findByEmail(email);
  if (!patient) throw new Error('Invalid email or password');

  const isMatch = await bcrypt.compare(password, patient.password);
  if (!isMatch) throw new Error('Invalid email or password');

  if (!patient.isVerified) throw new Error('Please verify your email before logging in.');

  // Generate the token and set it as a cookie
  const token = patientGenerateToken(res, patient._id.toString()); // Ensure patient._id is a string

  return {
    patient: {
      id: patient._id.toString(), // Convert ObjectId to string
      name: patient.name,
      email: patient.email,
      isVerified: patient.isVerified,
    },
    token, // Ensure this is returned
  };
}

async logoutPatient(res: Response): Promise<void> {
  res.clearCookie('token', { httpOnly: true, secure: true }); // Ensure this matches your environment (secure may be false in development)
}


async sendResetOtp(email: string) {
  try {
    const patient = await PatientRepository.findByEmail(email);
    
    if (!patient) {
      console.error('Patient not found for email:', email); // Log email for debugging
      throw new Error('Patient not found');
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    patient.otp = otp;
    patient.otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    await PatientRepository.updatePatient(patient);
    
    await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);

  } catch (error) {
    console.error('Error in sendResetOtp:', error); // Log full error for better insight
    throw new Error('Internal server error');
  }
}



async resetPassword(email: string, newPassword: string): Promise<void> {
  const patient = await PatientRepository.findByEmail(email); // Pass email directly
  if (!patient) {
    throw new Error('User not found');
  }

  // Hash the new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  patient.password = hashedPassword; // Save hashed password
  await patient.save();
}


}

export default new PatientService();
