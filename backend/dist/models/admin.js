import mongoose, { Schema } from 'mongoose';
const adminSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
}, { timestamps: true });
const Admin = mongoose.model('Admin', adminSchema, 'admins');
export default Admin;
