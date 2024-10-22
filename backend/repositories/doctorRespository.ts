import Doctor from '../models/doctor.js'; 

class DoctorRepository {
  async findByEmail(email: string) {
    return Doctor.findOne({ email });
  }

  async saveDoctor(doctorData: any) {
    const doctor = new Doctor(doctorData);
    return doctor.save();
  }

  async updateDoctor(doctor: any) {
    return doctor.save(); 
  }

  async findById(id: string) {
    return Doctor.findById(id);
  }

  async deleteDoctor(id: string) {
    return Doctor.findByIdAndDelete(id);
  }

  async getAllDoctors() {
    return Doctor.find({});
  }
}

export default new DoctorRepository();
