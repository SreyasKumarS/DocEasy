import { Response } from 'express';
import bcrypt from 'bcryptjs';
import sendEmail from '../utils/sendEmail.js';
import AdminRepository from '../repositories/adminRespository.js';
import adminGenerateToken from '../utils/adminGenerateToken.js';
import { log } from 'console';

class AdminService {

  async verifyOtp(email: string, otp: string) {
    console.log('reached service of verify otp')
    const admin = await AdminRepository.findByEmail(email);
    console.log(admin,'verify ito service admin insole')

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

 
  async resendOtp(email: string) {
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
    await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
  }


async loginAdmin(email: string, password: string, res: Response): Promise<{
  admin: {
    id: string;
    email: string;
    isVerified: boolean;
  };
  token: string;
}> {
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
    const token = adminGenerateToken(res, admin._id.toString());
      return {
      admin: {
        id: admin._id.toString(),
        email: admin.email,
        isVerified: admin.isVerified,
      },
      token,
    };
  } catch (error) {
    console.error('Error during admin login:', error); 
    throw error; 
  }
}

  async logoutAdmin(res: Response): Promise<void> {
    res.clearCookie('token', { httpOnly: true, secure: true });
  }

  async sendResetOtp(email: string) {
    try {
      const admin = await AdminRepository.findByEmail(email);

      if (!admin) {
        console.error('Admin not found for email:', email);
        throw new Error('Admin not found');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      admin.otp = otp;
      admin.otpExpires = new Date(Date.now() + 10 * 60 * 1000); 

      await AdminRepository.updateAdmin(admin);
      await sendEmail(email, 'OTP Verification', `Your new OTP is ${otp}`);
    } catch (error) {
      console.error('Error in sendResetOtp for admin:', error);
      throw new Error('Internal server error');
    }
  }

  
  async resetPassword(email: string, newPassword: string): Promise<void> {
    try {
      const admin = await AdminRepository.findByEmail(email);

      if (!admin) {
        throw new Error('Admin not found');
      }

   
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      admin.password = hashedPassword;
      await admin.save();
    } catch (error) {
      console.error('Error in resetPassword for admin:', error);
      throw new Error('Internal server error');
    }
  }



  // Fetch unapproved doctors----------------------------------------------------------------
  async fetchUnapprovedDoctors(): Promise<any[]> {
    try {
      const unapprovedDoctors = await AdminRepository.findUnapprovedDoctors();
      return unapprovedDoctors;
      

    } catch (error) {
      console.error('Error fetching unapproved doctors:', error);
      throw new Error('Internal server error');
    }
  }

  async approveDoctor(doctorId: string): Promise<void> {
    try {
      const doctor = await AdminRepository.findDoctorById(doctorId);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      doctor.isApproved = true; 
      await AdminRepository.updateDoctor(doctor); 
    } catch (error) {
      console.error('Error approving doctor:', error);
      throw new Error('Internal server error');
    }
  }

  async deleteDoctor(doctorId: string): Promise<void> {
    try {
      const doctor = await AdminRepository.findDoctorById(doctorId);
      
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      await AdminRepository.deleteDoctor(doctorId);
      console.log('Doctor has been deleted successfully.');
    } catch (error) {
      console.error('Error rejecting (deleting) doctor:', error);
      throw new Error('Internal server error');
    }
  }
  
  async fetchPatientListing (): Promise<any[]> {
    try {
      
      const unapprovedDoctors = await AdminRepository.findPatients();
      return unapprovedDoctors;
    } catch (error) {
      console.error('Error fetching unapproved doctors:', error);
      throw new Error('Internal server error');
    }
  }


  async deletePatient(patientId: string): Promise<void> {
    try {
     
      const patient = await AdminRepository.findPatientById(patientId);
      if (!patient) {
        throw new Error('Patient not found');
      } 
      await AdminRepository.deletePatient(patientId);
      console.log('Patient has been deleted successfully.');
    } catch (error) {
      console.error('Error rejecting (deleting) patient:', error);
      throw new Error('Internal server error');
    }
  }
  



  async blockDoctor(doctorId: string): Promise<void> {
    try {
      const doctor = await AdminRepository.findDoctorById(doctorId);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      doctor.isApproved = false; // Block the doctor
      await AdminRepository.updateDoctor(doctor);
    } catch (error) {
      console.error('Error blocking doctor:', error);
      throw new Error('Internal server error');
    }
  }

  async unblockDoctor(doctorId: string): Promise<void> {
    try {
      const doctor = await AdminRepository.findDoctorById(doctorId);
      if (!doctor) {
        throw new Error('Doctor not found');
      }
      doctor.isApproved = true; // Unblock the doctor
      await AdminRepository.updateDoctor(doctor);
    } catch (error) {
      console.error('Error unblocking doctor:', error);
      throw new Error('Internal server error');
    }
  }


  async fetchAllDoctors(): Promise<any[]> {
    try {
      const doctors = await AdminRepository.findAllDoctors();
      return doctors;
    } catch (error) {
      console.error('Error fetching all doctors:', error);
      throw new Error('Internal server error');
    }
  }
  


}

export default new AdminService();
