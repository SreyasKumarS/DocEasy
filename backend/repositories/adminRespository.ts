import Admin from '../models/admin.js';

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
}

export default new AdminRepository();
