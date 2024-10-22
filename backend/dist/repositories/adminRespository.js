import Admin from '../models/admin.js';
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
}
export default new AdminRepository();
