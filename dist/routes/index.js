"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./auth.routes");
const user_routes_1 = require("./user.routes");
const product_routes_1 = require("./product.routes");
const _router = express_1.default.Router();
_router.use("/user", user_routes_1.UserRouter);
_router.use("/auth", auth_routes_1.AuthRouter);
_router.use("/product", product_routes_1.ProductRouters);
exports.AllRouters = _router;
//# sourceMappingURL=index.js.map