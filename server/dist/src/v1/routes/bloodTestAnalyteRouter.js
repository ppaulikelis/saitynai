"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var bloodTestAnalyteController_1 = require("../controllers/bloodTestAnalyteController");
var authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
var bloodTestAnalyteValidatorMiddleware_1 = require("../middlewares/bloodTestAnalyteValidatorMiddleware");
var bloodTestAnalytePermission_1 = require("../permissions/bloodTestAnalytePermission");
exports.router = express_1["default"].Router();
exports.router
    .route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes')
    .all(authorizationMiddleware_1.authenticateToken)
    .get(bloodTestAnalytePermission_1.canGetBloodTestAnalyte, bloodTestAnalyteController_1.getAll)
    .post(bloodTestAnalytePermission_1.canPostBloodTestAnalyte, bloodTestAnalyteValidatorMiddleware_1.validatePost, bloodTestAnalyteController_1.post);
exports.router
    .route('/medical-cards/:medicalCardId/blood-tests/:bloodTestId/blood-test-analytes/:bloodTestAnalyteId')
    .all(authorizationMiddleware_1.authenticateToken)
    .get(bloodTestAnalytePermission_1.canGetBloodTestAnalyte, bloodTestAnalyteController_1.get)
    .put(bloodTestAnalytePermission_1.canUpdateBloodTestAnalyte, bloodTestAnalyteValidatorMiddleware_1.validateUpdate, bloodTestAnalyteController_1.update)["delete"](bloodTestAnalytePermission_1.canRemoveBloodTestAnalyte, bloodTestAnalyteController_1.remove);
//# sourceMappingURL=bloodTestAnalyteRouter.js.map