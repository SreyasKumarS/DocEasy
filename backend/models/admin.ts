import mongoose, { Schema } from 'mongoose';

// Define the schema for the admin
const adminSchema = new Schema(
  {
    email: { type: String, required: true, unique: true }, // Admin's email address
    password: { type: String, required: true }, // Hashed password for authentication
    isVerified: { type: Boolean, default: false }, // Verification status of the admin
    otp: { type: String }, // OTP for verification
    otpExpires: { type: Date }, // Expiry time for the OTP
  },
  { timestamps: true } // Add this option to enable timestamps
);

// Create the Admin model based on the schema
const Admin = mongoose.model('Admin', adminSchema,'admins');

export default Admin;
