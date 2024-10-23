import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extending the Request type to include adminId
interface AuthenticatedRequest extends Request {
    adminId?: string; // optional property for admin ID
}

const authenticateAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.userJwt; // Extract the token from cookies
    console.log(token,'tokeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Use jwt.verify with the appropriate callback signature
    jwt.verify(token, process.env.JWT_SECRET as string, (err: unknown, decoded: unknown) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        
        // Cast decoded to JwtPayload
        const payload = decoded as JwtPayload;

        // Ensure the userId is available
        if (payload && typeof payload.userId === 'string') {
            req.adminId = payload.userId; // Attach the admin ID to the request object
        }
        
        next();
    });
};

export default authenticateAdmin;
