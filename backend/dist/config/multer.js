import multer from "multer";
import path from "path";
// Log entry for debugging
console.log('Entered multer configuration');
// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/doctorFiles"); // Define the upload destination
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname) // Create a unique file name
        );
    },
});
// Define the file filter to restrict allowed file types
const fileFilter = (req, file, cb) => {
    const validFileTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (validFileTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    }
    else {
        cb(new Error("Only images and PDF files are allowed!"), false); // Reject the file with an error
    }
};
// Configure multer upload settings
export const multerUploadDoctorProfile = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // Set a 2 MB file size limit
});
// Export the multer configuration for use in routes
export default multerUploadDoctorProfile;
