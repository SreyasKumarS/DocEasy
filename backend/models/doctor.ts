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


import { Document, Schema, model } from 'mongoose';

// Define the IDoctor interface and export it
export interface IDoctor extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  specialization: string;
  licenseNumber: string;
  otp?: string;
  otpExpires?: Date;
  isVerified: boolean;
  isApproved: boolean;
  medicalLicense: string;
  otherDetails?: string;
}

// Define the doctor schema
const doctorSchema = new Schema<IDoctor>(
  {
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
  },
  { timestamps: true }
);

// Create and export the Doctor model
const Doctor = model<IDoctor>('Doctor', doctorSchema);
export default Doctor;
