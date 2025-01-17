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
const user_model_1 = __importDefault(require("../models/user.model"));
const utils_1 = require("../utils");
const bcrypt_1 = require("bcrypt");
// Adjust based on your project structure
const tokenBuilder = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = (0, utils_1.generateJWT)({
        id: user._id,
        role: user.role,
        tokenType: 'access',
    }, {
        issuer: user.email,
        subject: user.email,
        audience: 'root',
    });
    return {
        accessToken: accessToken,
    };
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Validate input
        if (!email || !password) {
            res.status(400).json({ message: 'Email and password are required.' });
            return;
        }
        // Find user
        const user = yield user_model_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        // Verify password
        const isValidPass = yield (0, bcrypt_1.compare)(password, user.password);
        if (!isValidPass) {
            res.status(401).json({ message: 'Invalid email or password.' });
            return;
        }
        // Generate token
        const token = yield tokenBuilder(user);
        const response = {
            user: {
                id: user.id,
                email: user.email,
                name: user.firstName, // Include only required fields
            },
            accessToken: token.accessToken,
        };
        res.status(200).json(response);
    }
    catch (error) {
        next(error); // Pass error to the middleware
    }
});
exports.default = {
    login,
};
// Generate token for login
// User login
//# sourceMappingURL=auth.controller.js.map