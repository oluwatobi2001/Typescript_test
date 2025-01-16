import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  role?: string; // Define the role as an optional string
  [key: string]: any; // Additional properties in the decoded token
}

// Ensure a single global augmentation of Express.Request


const CheckAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const token = authHeader.split(' ')[1];
    const publicKey = process.env.JWT_SECRETS;

    if (!publicKey) {
      throw new Error("JWT secret key is not defined in environment variables");
    }

    jwt.verify(token, publicKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Failed to authenticate token" });
      }

      // Safely assign the decoded value or null
      req.decoded = decoded ? (decoded as DecodedToken) : null;

      if (req.decoded?.role !== 'admin') {
        return res.status(403).json({ message: "You are not authorized to access this" });
      }

      next();
    });
  } catch (error) {
    next(error);
  }
};

// Default `req.decoded` to null to ensure type consistency


export { CheckAdmin };
