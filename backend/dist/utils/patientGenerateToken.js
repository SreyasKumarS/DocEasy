import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config(); // Ensure this is called at the start of your application
function patientGenerateToken(res, patientId) {
    const jwtSecret = process.env.JWT_SECRET;
    // Check if the secret is properly loaded
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    // Use the patientId to create the token
    const token = jwt.sign({ userId: patientId }, jwtSecret, {
        expiresIn: '30d',
    });
    console.log('Generated JWT Token:', token);
    // Set the token as a cookie
    res.cookie('userJwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in production
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    return token; // Return the generated token
}
;
export default patientGenerateToken; // Fix export statement
