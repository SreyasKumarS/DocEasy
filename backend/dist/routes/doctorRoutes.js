// routes/doctorRoutes.ts
import { Router } from 'express';
// import  multerUploadDoctorProfile from '../config/multer.js'
import { registerDoctor, verifyOtp, resendOtp, loginDoctor, logoutDoctor, sendDoctorResetOtp, resetDoctorPassword, } from '../controllers/doctorControllers.js';
const router = Router();
router.post('/register', registerDoctor);
router.post('/verify-otpDoctor', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/loginDoctor', loginDoctor);
router.post('/logout', logoutDoctor);
router.post('/sendResetDoctorOtp', sendDoctorResetOtp);
router.post('/resetDoctorPassword', resetDoctorPassword);
export default router;
