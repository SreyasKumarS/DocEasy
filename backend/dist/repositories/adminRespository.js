import Admin from '../models/admin.js';
import Doctor from '../models/doctor.js';
import Patient from '../models/patient.js';
class AdminRepository {
    async findByEmail(email) {
        return Admin.findOne({ email });
    }
    async saveAdmin(adminData) {
        const admin = new Admin(adminData);
        return admin.save();
    }
    async updateAdmin(admin) {
        return admin.save();
    }
    async findUnapprovedDoctors() {
        return Doctor.find({ isApproved: false });
    }
    async findDoctorById(doctorId) {
        return Doctor.findById(doctorId);
    }
    async findPatientById(patientId) {
        return Patient.findById(patientId);
    }
    async updateDoctor(doctor) {
        return doctor.save();
    }
    async deleteDoctor(doctorId) {
        try {
            await Doctor.findByIdAndDelete(doctorId);
            console.log(`Doctor with ID ${doctorId} deleted successfully.`);
        }
        catch (error) {
            console.error('Error deleting doctor:', error);
            throw new Error('Internal server error');
        }
    }
    async findPatients() {
        return Patient.find({ isVerified: true });
    }
    async deletePatient(patientId) {
        try {
            await Patient.findByIdAndDelete(patientId);
        }
        catch (error) {
            throw new Error('Internal server error');
        }
    }
    // async findDoctorById(doctorId: string): Promise<IDoctor | null> {
    //   return Doctor.findById(doctorId);
    // }
    // async updateDoctor(doctor: IDoctor): Promise<IDoctor> {
    //   return doctor.save(); // Save the updated doctor data
    // }
    async findAllDoctors() {
        try {
            const doctors = await Doctor.find(); // Fetches all doctors from the 'Doctor' collection
            return doctors;
        }
        catch (error) {
            console.error('Error fetching all doctors from database:', error);
            throw new Error('Internal server error while fetching doctors');
        }
    }
}
export default new AdminRepository();
