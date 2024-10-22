import Admin from '../models/admin.js';
import Doctor, { IDoctor } from '../models/doctor.js'; // Make sure to import the IDoctor interface

class AdminRepository {
  
  async findByEmail(email: string) {
    return Admin.findOne({ email });
  }

  async saveAdmin(adminData: any) {
    const admin = new Admin(adminData);
    return admin.save();
  }

  async updateAdmin(admin: any) {
    return admin.save(); // This should work as `admin` is expected to be an instance of the Admin model
  }

  // New Method: Find unapproved doctors
  async findUnapprovedDoctors(): Promise<IDoctor[]> {
    return Doctor.find({ isApproved: false }); // Adjust the query as per your schema
  }

  // New Method: Find doctor by ID
  async findDoctorById(doctorId: string): Promise<IDoctor | null> {
    return Doctor.findById(doctorId); // This returns an instance of IDoctor or null
  }

  // New Method: Update doctor details
  async updateDoctor(doctor: IDoctor): Promise<IDoctor> {
    return doctor.save(); // Call save on the instance of the doctor document
  }


  async deleteDoctor(doctorId: string): Promise<void> {
    try {
      await Doctor.findByIdAndDelete(doctorId); // This will remove the doctor from the database
      console.log(`Doctor with ID ${doctorId} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw new Error('Internal server error');
    }
    
  }
}

export default new AdminRepository();
