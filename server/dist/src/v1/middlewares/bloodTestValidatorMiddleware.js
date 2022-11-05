"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validate = void 0;
var joi_1 = __importDefault(require("joi"));
var customError_1 = require("../models/entities/customError");
var schema = joi_1["default"].object({
    date: joi_1["default"].date().less(new Date())
});
function validate(req, res, next) {
    var data = req.body;
    var error = schema.validate(data, { abortEarly: true }).error;
    if (error) {
        next(customError_1.invalidData);
    }
    else {
        next();
    }
}
exports.validate = validate;
//# sourceMappingURL=bloodTestValidatorMiddleware.js.map