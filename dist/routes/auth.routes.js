"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const controllers_1 = require("../controllers");
const validators_1 = require("../validators");
//AUTH ROUTES//
const router = (0, express_1.Router)();
//USER LOGIN
router.route('/login').post(validators_1.VerifyLogin, controllers_1.authController.login);
//USER FORGOT PASSWORD
//EXPORT
exports.AuthRouter = router;
//# sourceMappingURL=auth.routes.js.map