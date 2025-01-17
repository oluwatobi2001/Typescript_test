"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLoginSchema = exports.UserRegSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const UserRegSchema = joi_1.default.object({
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'net']
        }
    }),
    firstName: joi_1.default.string().min(3).max(30).required(),
    lastName: joi_1.default.string().min(3).max(30).required(),
    role: joi_1.default.string(),
    residence: joi_1.default.string().min(4).max(20),
    password: joi_1.default.string().alphanum().min(8).required(),
});
exports.UserRegSchema = UserRegSchema;
const UserLoginSchema = joi_1.default.object({
    email: joi_1.default.string().email({
        minDomainSegments: 2,
        tlds: {
            allow: ['com', 'net']
        }
    }),
    password: joi_1.default.string().alphanum().min(8).required(),
});
exports.UserLoginSchema = UserLoginSchema;
//# sourceMappingURL=userValidator.js.map