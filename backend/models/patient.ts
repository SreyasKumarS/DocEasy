import mongoose, { Schema } from 'mongoose';

// Define the schema with the required fields and timestamps
const patientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    otherDetails: { type: String }, // Add other fields as needed
  },
  { timestamps: true } // Enable timestamps
);

const Patient = mongoose.model('Patient', patientSchema); // TypeScript will infer types from this schema

export default Patient;
