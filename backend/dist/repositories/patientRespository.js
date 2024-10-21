// repositories/patientRepository.ts
import Patient from '../models/patient.js';
class PatientRepository {
    async findByEmail(email) {
        return Patient.findOne({ email });
    }
    async savePatient(patientData) {
        const patient = new Patient(patientData);
        return patient.save();
    }
    async updatePatient(patient) {
        return patient.save();
    }
}
export default new PatientRepository();
