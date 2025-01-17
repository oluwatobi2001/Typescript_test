"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouters = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const permissionMiddleware_1 = require("../middlewares/permissionMiddleware");
const router = (0, express_1.Router)();
router.route('/create-product').post(authMiddleware_1.AuthenticaticateUser, validators_1.VerifyProduct, permissionMiddleware_1.CheckAdmin, controllers_1.ProductController.CreateProduct);
router.route('/get-products').get(authMiddleware_1.AuthenticaticateUser, controllers_1.ProductController.GetAllProducts);
router.route('/get-products/:productId').get(authMiddleware_1.AuthenticaticateUser, controllers_1.ProductController.GetSingleProduct);
router.route('/delete-product/:productId').delete(authMiddleware_1.AuthenticaticateUser, permissionMiddleware_1.CheckAdmin, controllers_1.ProductController.deleteProduct);
router.route('/update-product/:productId').put(validators_1.VerifyProduct, permissionMiddleware_1.CheckAdmin, controllers_1.ProductController.UpdateProduct);
exports.ProductRouters = router;
//# sourceMappingURL=product.routes.js.map