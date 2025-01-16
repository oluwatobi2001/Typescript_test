import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken {
  [key: string]: any; // Define the shape of your decoded token as needed
}

declare global {
  namespace Express {
    interface Request {
      decoded: DecodedToken | null;// Add the `decoded` property to the Request object
    }
  }
}

const AuthenticaticateUser =  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if(!req.headers['authorization'] ) {
      res.status(400).json("User is not logged in. Kindly login and try again")
    }
    if (req.headers['authorization']) {
      const token = req.headers['authorization'].split(' ')[1];
      const publicKey = process.env.JWT_SECRETS;

      if (!publicKey) {
        throw new Error("JWT secret key is not defined in environment variables");
      }

      jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
          next(new Error('Failed to authenticate token'));
        } else {
          req.decoded = decoded as DecodedToken; // Safely cast the type of decoded
          next();
        }
      });
    } else {
      next(new Error('No token provided'));
    }
  } catch (error) {
    next(error);
  }
};



export {AuthenticaticateUser}