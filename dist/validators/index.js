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
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyLogin = exports.VerifyProduct = exports.VerifyUser = void 0;
const productValidator_1 = require("./productValidator");
const userValidator_1 = require("./userValidator");
const VerifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = userValidator_1.UserRegSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
});
exports.VerifyUser = VerifyUser;
const VerifyLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = userValidator_1.UserLoginSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
});
exports.VerifyLogin = VerifyLogin;
const VerifyProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = productValidator_1.ProductRegSchema.validate(req.body);
    if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
    }
    next();
});
exports.VerifyProduct = VerifyProduct;
//# sourceMappingURL=index.js.map