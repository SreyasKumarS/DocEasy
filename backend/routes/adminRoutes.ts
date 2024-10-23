import { Router } from 'express';
import authenticateAdmin from '../middleware/authMiddleware.js'
import {
    loginAdmin,
    logoutAdmin,
    verifyOtp,
    resendOtp,
    sendAdminResetOtp,
    resetAdminPassword,
    fetchUnapprovedDoctors,   
    approveDoctor,           
    deleteDoctor,
    fetchPatientListing,
    deletePatient,
    blockDoctor,          
    unblockDoctor,
    fetchAllDoctors       

} from '../controllers/adminController.js';

const router = Router();

router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);
router.post('/verify-otpAdmin', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/sendResetAdminOtp', sendAdminResetOtp);
router.post('/resetAdminPassword', resetAdminPassword);


// New doctor-related routes
// router.get('/unapproved', fetchUnapprovedDoctors);   // Fetch unapproved doctors
// router.put('/approve/:doctorId', approveDoctor);     // Approve a doctor
// router.delete('/delete/:doctorId', deleteDoctor);           // Reject a doctor

router.get('/unapproved', authenticateAdmin, fetchUnapprovedDoctors);
router.put('/approve/:doctorId', authenticateAdmin, approveDoctor);
router.delete('/delete/:doctorId', authenticateAdmin, deleteDoctor);
router.get('/patientlisting', authenticateAdmin, fetchPatientListing);
router.delete('/deletePatient/:patientId', authenticateAdmin, deletePatient);

router.put('/block/:doctorId', authenticateAdmin, blockDoctor);     
router.put('/unblock/:doctorId', authenticateAdmin, unblockDoctor);
router.get('/fetchAllDoctors', authenticateAdmin, fetchAllDoctors);


export default router;
