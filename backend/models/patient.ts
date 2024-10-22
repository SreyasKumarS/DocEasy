import mongoose, { Schema } from 'mongoose';
const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    otherDetails: { type: String }, 
  },
  { timestamps: true } 
);

const Patient = mongoose.model('Patient', patientSchema); 

export default Patient;
