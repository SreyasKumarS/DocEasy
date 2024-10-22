import Patient from '../models/patient.js';

class PatientRepository {
  async findByEmail(email: string) {
    return Patient.findOne({ email });
  }

  async savePatient(patientData: any) {
    const patient = new Patient(patientData);
    return patient.save();
  }

  async updatePatient(patient: any) {
    return patient.save();
  }
}

export default new PatientRepository();
