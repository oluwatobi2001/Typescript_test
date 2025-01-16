

import User, { IUserModel } from '../models/user.model';
import { generateJWT } from '../utils';


import { compare, hash } from 'bcrypt';

import { Request, Response, NextFunction } from 'express';

 // Adjust based on your project structure



 const tokenBuilder = async (user: IUserModel) => {
    const accessToken = generateJWT(
        {
            id: user._id,
            role: user.role,
            tokenType: 'access',
        },
        {
            issuer: user.email,
            subject: user.email,
            audience: 'root',
        }
    );

    return {
        accessToken: accessToken,
    };
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required.' });
      return;
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    // Verify password
    const isValidPass = await compare(password, user.password);
    if (!isValidPass) {
      res.status(401).json({ message: 'Invalid email or password.' });
      return;
    }

    // Generate token
    const token = await tokenBuilder(user);
    const response = {
      user: {
        id: user.id,
        email: user.email,
        name: user.firstName, // Include only required fields
      },
      accessToken: token.accessToken,
    };

    res.status(200).json(response);
  } catch (error) {
    next(error); // Pass error to the middleware
  }
};

export default {
  login,
};


// Generate token for login

// User login
