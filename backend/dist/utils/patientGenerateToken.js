import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
function patientGenerateToken(res, patientId) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    const token = jwt.sign({ userId: patientId }, jwtSecret, {
        expiresIn: '30d',
    });
    console.log('Generated JWT Token:', token);
    res.cookie('userJwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return token;
}
;
export default patientGenerateToken;
