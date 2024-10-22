import { Router } from 'express';
import {
    loginAdmin,
    logoutAdmin,
    verifyOtp,
    resendOtp,
    sendAdminResetOtp,
    resetAdminPassword,
    fetchUnapprovedDoctors,   // New route for fetching unapproved doctors
    approveDoctor,            // New route for approving a doctor
    deleteDoctor              // New route for rejecting a doctor
} from '../controllers/adminController.js';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.post('/verify-otpAdmin', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/sendResetAdminOtp', sendAdminResetOtp);
router.post('/resetAdminPassword', resetAdminPassword);


// New doctor-related routes
router.get('/unapproved', fetchUnapprovedDoctors);   // Fetch unapproved doctors
router.put('/approve/:doctorId', approveDoctor);     // Approve a doctor
router.delete('/delete/:doctorId', deleteDoctor);           // Reject a doctor

export default router;
