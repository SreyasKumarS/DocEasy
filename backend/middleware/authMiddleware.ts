import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


interface CustomRequest extends Request {
  user?: any; 
}

const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

export default authMiddleware;
