// repositories/adminRepository.ts
import Admin from '../models/admin.js';
class AdminRepository {
    // Find an admin by their email
    async findByEmail(email) {
        return Admin.findOne({ email });
    }
    // Save a new admin to the database
    async saveAdmin(adminData) {
        const admin = new Admin(adminData);
        return admin.save();
    }
    // Update an existing admin's data
    async updateAdmin(admin) {
        return admin.save();
    }
}
export default new AdminRepository();
