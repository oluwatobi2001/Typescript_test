"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAdmin = void 0;
const jwt = __importStar(require("jsonwebtoken"));
// Ensure a single global augmentation of Express.Request
const CheckAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
            var _a;
            if (err) {
                return res.status(403).json({ message: "Failed to authenticate token" });
            }
            // Safely assign the decoded value or null
            req.decoded = decoded ? decoded : null;
            if (((_a = req.decoded) === null || _a === void 0 ? void 0 : _a.role) !== 'admin') {
                return res.status(403).json({ message: "You are not authorized to access this" });
            }
            next();
        });
    }
    catch (error) {
        next(error);
    }
});
exports.CheckAdmin = CheckAdmin;
//# sourceMappingURL=permissionMiddleware.js.map