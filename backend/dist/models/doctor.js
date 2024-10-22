// import mongoose, { Schema } from 'mongoose';
// const doctorSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     specialization: { type: String, required: true }, 
//     licenseNumber: { type: String, required: true, unique: true }, 
//     otp: { type: String },
//     otpExpires: { type: Date },
//     isVerified: { type: Boolean, default: false },
//     isApproved: { type: Boolean, default: false },
//     medicalLicense: { type: String, required: true }, 
//     otherDetails: { type: String }
//   },
//   { timestamps: true } 
// );
// const Doctor = mongoose.model('Doctor', doctorSchema);
// export default Doctor;
import { Schema, model } from 'mongoose';
// Define the doctor schema
const doctorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    licenseNumber: { type: String, required: true, unique: true },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    isApproved: { type: Boolean, default: false },
    medicalLicense: { type: String, required: true },
    otherDetails: { type: String }
}, { timestamps: true });
// Create and export the Doctor model
const Doctor = model('Doctor', doctorSchema);
export default Doctor;
