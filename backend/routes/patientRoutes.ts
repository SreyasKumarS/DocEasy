import { Router } from 'express';
import {
    registerPatient,
    verifyOtp,
    resendOtp,
    loginPatient,
    logoutPatient,
    sendResetOtp,
    resetPassword
   
} from '../controllers/patientController.js';


const router = Router();
router.post('/register', registerPatient);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/login', loginPatient);
router.post('/logout', logoutPatient);
router.post('/sendResetOtp', sendResetOtp);
router.post('/ResetPassword',resetPassword);



export default router;
