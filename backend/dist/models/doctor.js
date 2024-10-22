import mongoose, { Schema } from 'mongoose';
// Define the schema for the doctor with timestamps
const doctorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true }, // Area of expertise
    licenseNumber: { type: String, required: true, unique: true }, // Medical license number
    otp: { type: String },
    otpExpires: { type: Date },
    isVerified: { type: Boolean, default: false },
    otherDetails: { type: String } // Add other fields as needed
}, { timestamps: true } // Enable timestamps
);
// Create the Doctor model based on the schema
const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;
