import { Router } from 'express';
import  { multerDoctor } from '../config/multer.js'

import {
    registerDoctor,
    verifyOtp,
    resendOtp,
    loginDoctor,
    logoutDoctor,
    sendDoctorResetOtp,
    resetDoctorPassword ,
} from '../controllers/doctorControllers.js';



const router = Router();

// router.post('/register', multerUploadDoctorProfile.single('licenseFile'), registerDoctor);
router.post('/register', (req, res, next) => {
    multerDoctor.single('licenseFile')(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(400).json({ message: err.message });
      }
      console.log('Multer processing done, proceeding to registerDoctor');
      registerDoctor(req, res, next);
    });
  });


router.post('/verify-otpDoctor', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/loginDoctor', loginDoctor);
router.post('/logout', logoutDoctor);
router.post('/sendResetDoctorOtp', sendDoctorResetOtp);
router.post('/resetDoctorPassword', resetDoctorPassword );

export default router;
