"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var bloodTestController_1 = require("../controllers/bloodTestController");
var authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
var bloodTestValidatorMiddleware_1 = require("../middlewares/bloodTestValidatorMiddleware");
var bloodTestPermissions_1 = require("../permissions/bloodTestPermissions");
exports.router = express_1["default"].Router();
exports.router
    .route('/medical-cards/:medicalCardId/blood-tests')
    .all(authorizationMiddleware_1.authenticateToken)
    .get(bloodTestPermissions_1.canGetBloodTest, bloodTestController_1.getAll)
    .post(bloodTestPermissions_1.canPostBloodTest, bloodTestValidatorMiddleware_1.validate, bloodTestController_1.post);
exports.router
    .route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId')
    .all(authorizationMiddleware_1.authenticateToken)
    .get(bloodTestPermissions_1.canGetBloodTest, bloodTestController_1.get)
    .put(bloodTestPermissions_1.canUpdateBloodTest, bloodTestValidatorMiddleware_1.validate, bloodTestController_1.update)["delete"](bloodTestPermissions_1.canRemoveBloodTest, bloodTestController_1.remove);
//# sourceMappingURL=bloodTestRouter.js.map