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
const products_model_1 = __importDefault(require("../models/products.model"));
const CreateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, title, description, quantity } = req.body;
        if (!productId || !title || !description) {
            res.status(400).json({ message: 'All fields are required.' });
            return;
        }
        const Product = new products_model_1.default({
            productId, title, description, quantity
        });
        const savedProduct = yield Product.save();
        res.status(200).json({ message: 'product created successfully. OTP sent for verification.', savedProduct });
    }
    catch (error) {
        next(error);
    }
});
const GetAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield products_model_1.default.find();
        if (allProducts == null) {
            res.status(400).json("No product entry available");
        }
        res.status(200).json(allProducts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});
const GetSingleProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const productId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.productId;
        const productDetails = yield products_model_1.default.find({ productId });
        if (!productDetails) {
            res.status(400).json({
                err: "Product details aren't available"
            });
        }
        res.status(200).json(productDetails);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});
const deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const productId = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.productId;
        const productDetails = yield products_model_1.default.find({ _id: productId });
        if (!productDetails) {
            res.status(400).json({
                err: "Product details aren't available"
            });
        }
        yield products_model_1.default.deleteOne({ productId });
        res.status(200).json({ msg: "Product successfully deleted" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});
const UpdateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productInfo = req.params.productId;
        const { title, description, quantity, productId } = req.body;
        if (!productId) {
            res.status(400).json(" incorrect product information");
        }
        const updateProduct = yield products_model_1.default.findByIdAndUpdate({ _id: productInfo }, {
            title, description, quantity, productId
        }, { new: true });
        if (!updateProduct) {
            res.status(400).json("unable to update product info. Please try again later");
        }
        res.status(200).json("product successfully updated");
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
        return;
    }
});
exports.default = { CreateProduct, GetAllProducts, GetSingleProduct, deleteProduct, UpdateProduct
};
//# sourceMappingURL=product.controller.js.map