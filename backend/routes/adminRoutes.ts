import { Router } from 'express';
import {
    loginAdmin,
    logoutAdmin,
    verifyOtp,
    resendOtp,
    sendAdminResetOtp,
    resetAdminPassword,
} from '../controllers/adminController.js';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.post('/verify-otpAdmin', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/sendResetAdminOtp', sendAdminResetOtp);
router.post('/resetAdminPassword', resetAdminPassword);

export default router;
