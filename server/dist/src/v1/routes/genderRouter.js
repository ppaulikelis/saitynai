"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var genderController_1 = require("../controllers/genderController");
exports.router = express_1["default"].Router();
exports.router.route('/genders').get(genderController_1.getAll);
//# sourceMappingURL=genderRouter.js.map