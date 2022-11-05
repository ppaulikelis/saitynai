"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var postController_1 = require("../controllers/postController");
var authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
var postValidatorMiddleware_1 = require("../middlewares/postValidatorMiddleware");
var postPermissions_1 = require("../permissions/postPermissions");
exports.router = express_1["default"].Router();
exports.router.route('/posts').get(postController_1.getAll).post(authorizationMiddleware_1.authenticateToken, postPermissions_1.canPostPost, postValidatorMiddleware_1.validatePost, postController_1.post);
exports.router
    .route('/posts/:postId')
    .get(postController_1.get)
    .put(authorizationMiddleware_1.authenticateToken, postPermissions_1.canUpdatePost, postValidatorMiddleware_1.validateUpdate, postController_1.update)["delete"](authorizationMiddleware_1.authenticateToken, postPermissions_1.canRemovePost, postController_1.remove);
//# sourceMappingURL=postRouter.js.map