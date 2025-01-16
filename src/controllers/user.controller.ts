import { NextFunction, Request, Response } from 'express';
import { generateJWT, generateOtp } from '../utils';
import User, { IUserModel } from '../models/user.model';
import otpMaster from '../models/otp.model';
import { hash } from 'bcrypt';

// CREATE USER & SEND MAIL FOR VERIFICATION
const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { firstName, lastName,  email, password, role } = req.body;

    // Validate input
    if (!firstName || !password || !lastName  || !role || !email) {
      res.status(400).json({ message: 'All fields are required.' });
      return;
    }

    // Check if the user already exists
    const userExist = await User.exists({ email });
    if (userExist) {
      res.status(400).json({ message: 'User with this email already exists.' });
      return;
    }

    // Encrypt password
    const hashPassword = await hash(password, 12);

    // Create new user
    const user = new User({
      firstName,
      lastName,
   
      email,
      password: hashPassword,
      role,
    });

    const savedUser = await user.save();

    // Generate OTP for email verification
    const tokenExpiration = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes
    const otp = generateOtp(6);

    const newOtp = new otpMaster({
      userId: savedUser._id,
      type: 'Verification',
      otp,
      tokenExpiration,
    });

    await newOtp.save();

    // Send response
    res.status(200).json({ message: 'User created successfully. OTP sent for verification.', otp });
  } catch (error) {
    next(error);
  }
};

// GET USER DETAILS BY ID
const getUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// GET ALL USER LIST
const getAllUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const pageOptions = {
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
    };

    const count = await User.countDocuments({});
    const users = await User.find()
      .populate('role')
      .limit(pageOptions.limit)
      .skip((pageOptions.page - 1) * pageOptions.limit)
      .sort({ createdAt: -1 });

    const meta = {
      total: count,
      limit: pageOptions.limit,
      totalPages: Math.ceil(count / pageOptions.limit),
      currentPage: pageOptions.page,
    };

    res.status(200).json({ meta, users });
  } catch (error) {
    next(error);
  }
};

// EXPORT
export default {
  createUser,
  getUser,
  getAllUser,
};
