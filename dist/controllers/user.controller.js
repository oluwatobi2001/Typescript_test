"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const user_model_1 = __importDefault(require("../models/user.model"));
const otp_model_1 = __importDefault(require("../models/otp.model"));
const bcrypt_1 = require("bcrypt");
// CREATE USER & SEND MAIL FOR VERIFICATION
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        // Validate input
        if (!firstName || !password || !lastName || !role || !email) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        // Check if the user already exists
        const userExist = yield user_model_1.default.exists({ email });
        if (userExist) {
            res.status(400).json({ message: 'User with this email already exists.' });
            return;
        }
        // Encrypt password
        const hashPassword = yield (0, bcrypt_1.hash)(password, 12);
        // Create new user
        const user = new user_model_1.default({
            firstName,
            lastName,
            email,
            password: hashPassword,
            role,
        });
        const savedUser = yield user.save();
        // Generate OTP for email verification
        const tokenExpiration = new Date(new Date().getTime() + 10 * 60 * 1000); // 10 minutes
        const otp = (0, utils_1.generateOtp)(6);
        const newOtp = new otp_model_1.default({
            userId: savedUser._id,
            type: 'Verification',
            otp,
            tokenExpiration,
        });
        yield newOtp.save();
        // Send response
        res.status(200).json({ message: 'User created successfully. OTP sent for verification.', otp });
    }
    catch (error) {
        next(error);
    }
});
// GET USER DETAILS BY ID
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const user = yield user_model_1.default.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found.' });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
});
// GET ALL USER LIST
const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageOptions = {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
        };
        const count = yield user_model_1.default.countDocuments({});
        const users = yield user_model_1.default.find()
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
    }
    catch (error) {
        next(error);
    }
});
// EXPORT
exports.default = {
    createUser,
    getUser,
    getAllUser,
};
//# sourceMappingURL=user.controller.js.map