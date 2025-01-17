"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const permissionMiddleware_1 = require("../middlewares/permissionMiddleware");
//USER ROUTES//
const _router = (0, express_1.Router)();
//USER SIGNUP
_router
    .route('/sign-up')
    .post(validators_1.VerifyUser, controllers_1.userController.createUser);
//UPDATE USER DETAILS
//GET USER DETAILS BY ID
_router
    .route('/fetch/:userId')
    .get(authMiddleware_1.AuthenticaticateUser, permissionMiddleware_1.CheckAdmin, controllers_1.userController.getUser);
//GET ALL USER LIST
_router
    .route('/fetch')
    .get(authMiddleware_1.AuthenticaticateUser, permissionMiddleware_1.CheckAdmin, controllers_1.userController.getAllUser);
//EXPORT
exports.UserRouter = _router;
//# sourceMappingURL=user.routes.js.map