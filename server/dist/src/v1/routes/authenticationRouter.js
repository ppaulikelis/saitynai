"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var authenticationController_1 = require("../controllers/authenticationController");
var authenticationValidatorMiddleware_1 = require("../middlewares/authenticationValidatorMiddleware");
exports.router = express_1["default"].Router();
exports.router.route('/signin').post(authenticationValidatorMiddleware_1.validate, authenticationController_1.signin);
exports.router.route('/signup').post(authenticationValidatorMiddleware_1.validate, authenticationController_1.signup);
//# sourceMappingURL=authenticationRouter.js.map