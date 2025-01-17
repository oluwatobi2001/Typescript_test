"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRegSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const ProductRegSchema = joi_1.default.object({
    productId: joi_1.default.number().required(),
    title: joi_1.default.string().min(3).max(30).required(),
    description: joi_1.default.string().required(),
    quantity: joi_1.default.number(),
});
exports.ProductRegSchema = ProductRegSchema;
//# sourceMappingURL=productValidator.js.map