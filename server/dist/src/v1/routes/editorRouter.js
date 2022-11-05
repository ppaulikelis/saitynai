"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var editorController_1 = require("../controllers/editorController");
var authenticationValidatorMiddleware_1 = require("../middlewares/authenticationValidatorMiddleware");
var authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
var editorPermissions_1 = require("../permissions/editorPermissions");
exports.router = express_1["default"].Router();
exports.router.route('/editors').all(authorizationMiddleware_1.authenticateToken).get(editorPermissions_1.canGetEditor, editorController_1.getAll).post(editorPermissions_1.canPostEditor, authenticationValidatorMiddleware_1.validate, editorController_1.post);
exports.router.route('/editors/:editorId').all(authorizationMiddleware_1.authenticateToken)["delete"](editorPermissions_1.canRemoveEditor, editorController_1.remove);
//# sourceMappingURL=editorRouter.js.map