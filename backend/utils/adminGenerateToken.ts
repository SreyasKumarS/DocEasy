import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Response } from 'express';


dotenv.config();

function adminGenerateToken(res: Response, adminId: string): string {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const token = jwt.sign({ userId: adminId, role: 'admin' }, jwtSecret, {
        expiresIn: '30d', 
    });
    console.log('Generated JWT Token for Admin:', token);
    res.cookie('userJwt', token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',  // Use 'Lax' fo
        maxAge: 30 * 24 * 60 * 60 * 1000, 
    });
    return token; 
}


export default adminGenerateToken;
