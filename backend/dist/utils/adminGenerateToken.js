import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
function adminGenerateToken(res, adminId) {
    // Ensure the JWT secret is loaded from the environment variables
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    // Generate the JWT token using the adminId
    const token = jwt.sign({ userId: adminId, role: 'admin' }, jwtSecret, {
        expiresIn: '30d', // Token expiration time
    });
    console.log('Generated JWT Token for Admin:', token);
    // Set the generated token as a cookie in the response
    res.cookie('userJwt', token, {
        httpOnly: true, // Prevent JavaScript access to the cookie
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict', // Strict same-site cookie policy
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    });
    return token; // Return the generated token
}
export default adminGenerateToken;
