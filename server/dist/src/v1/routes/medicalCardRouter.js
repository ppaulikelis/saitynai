"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var medicalCardController_1 = require("../controllers/medicalCardController");
var authorizationMiddleware_1 = require("../middlewares/authorizationMiddleware");
var medicalCardValidatorMiddleware_1 = require("../middlewares/medicalCardValidatorMiddleware");
var medicalCardPermissions_1 = require("../permissions/medicalCardPermissions");
exports.router = express_1["default"].Router();
exports.router
    .route('/medical-cards')
    .all(authorizationMiddleware_1.authenticateToken)
    .get(medicalCardPermissions_1.canGetMedicalCard, medicalCardController_1.getAll)
    .post(medicalCardPermissions_1.canPostMedicalCard, medicalCardValidatorMiddleware_1.validatePost, medicalCardController_1.post);
exports.router
    .route('/medical-cards/:medicalCardId')
    .all(authorizationMiddleware_1.authenticateToken)
    .get(medicalCardPermissions_1.canGetMedicalCard, medicalCardController_1.get)
    .put(medicalCardPermissions_1.canUpdateMedicalCard, medicalCardValidatorMiddleware_1.validateUpdate, medicalCardController_1.update)["delete"](medicalCardPermissions_1.canRemoveMedicalCard, medicalCardController_1.remove);
//# sourceMappingURL=medicalCardRouter.js.map