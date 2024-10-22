// repositories/doctorRepository.ts
import Doctor from '../models/doctor.js'; // Adjust the import path as needed
class DoctorRepository {
    async findByEmail(email) {
        return Doctor.findOne({ email });
    }
    async saveDoctor(doctorData) {
        const doctor = new Doctor(doctorData);
        return doctor.save();
    }
    async updateDoctor(doctor) {
        return doctor.save(); // Save updated doctor details
    }
    // Additional methods for doctor repository can be added as needed
    async findById(id) {
        return Doctor.findById(id);
    }
    async deleteDoctor(id) {
        return Doctor.findByIdAndDelete(id);
    }
    async getAllDoctors() {
        return Doctor.find({});
    }
}
export default new DoctorRepository();
