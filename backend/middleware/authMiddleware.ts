import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface DecodedToken {
  id: string;
}

// Extend Express Request interface
declare module 'express-serve-static-core' {
  interface Request {
    user?: any;
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

export const pharmacist = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === 'pharmacist' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized, requires pharmacist role' });
  }
};

export const medical = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && ['doctor', 'nurse', 'admin'].includes(req.user.role)) {
    next();
  } else {
    res.status(401).json({ message: 'Not authorized, requires medical staff role' });
  }
};