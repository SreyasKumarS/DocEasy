import Admin from '../models/admin.js';
import Doctor, { IDoctor } from '../models/doctor.js'; 
import Patient from '../models/patient.js'

class AdminRepository {
  
  async findByEmail(email: string) {
    return Admin.findOne({ email });
  }

  async saveAdmin(adminData: any) {
    const admin = new Admin(adminData);
    return admin.save();
  }

  async updateAdmin(admin: any) {
    return admin.save(); 
  }

  
  async findUnapprovedDoctors(): Promise<IDoctor[]> {
    return Doctor.find({ isApproved: false }); 
  }

 
  async findDoctorById(doctorId: string): Promise<IDoctor | null> {
    return Doctor.findById(doctorId); 
  }

  async findPatientById(patientId: string): Promise<IDoctor | null> {
    return Patient.findById(patientId); 
  }


  async updateDoctor(doctor: IDoctor): Promise<IDoctor> {
    return doctor.save(); 
  }


  async deleteDoctor(doctorId: string): Promise<void> {
    try {
      await Doctor.findByIdAndDelete(doctorId); 
      console.log(`Doctor with ID ${doctorId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw new Error('Internal server error');
    }
  }

  
  async findPatients(): Promise<IDoctor[]> {
    return Patient.find({ isVerified: true }); 
  }

  async deletePatient(patientId: string): Promise<void> {
    try {
      await Patient.findByIdAndDelete(patientId); 
    } catch (error) {
      throw new Error('Internal server error');
    }
  }


}

export default new AdminRepository();
