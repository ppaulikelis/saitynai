"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validateUpdate = exports.validatePost = void 0;
var joi_1 = __importDefault(require("joi"));
var customError_1 = require("../models/entities/customError");
var schemaPost = joi_1["default"].object({
    name: joi_1["default"].string().min(1).max(35).required(),
    surname: joi_1["default"].string().min(1).max(35),
    genderId: joi_1["default"].number().min(1).max(2).required(),
    birthDate: joi_1["default"].date().less(new Date()).required()
});
var schemaUpdate = joi_1["default"].object({
    name: joi_1["default"].string().min(1).max(35),
    surname: joi_1["default"].string().min(1).max(35),
    genderId: joi_1["default"].number().min(1).max(2),
    birthDate: joi_1["default"].date().less(new Date())
});
function validatePost(req, res, next) {
    var data = req.body;
    var error = schemaPost.validate(data, { abortEarly: true }).error;
    if (error) {
        next(customError_1.invalidData);
    }
    else {
        next();
    }
}
exports.validatePost = validatePost;
function validateUpdate(req, res, next) {
    var data = req.body;
    var error = schemaUpdate.validate(data, { abortEarly: true }).error;
    if (error) {
        next(customError_1.invalidData);
    }
    else {
        next();
    }
}
exports.validateUpdate = validateUpdate;
//# sourceMappingURL=medicalCardValidatorMiddleware.js.map