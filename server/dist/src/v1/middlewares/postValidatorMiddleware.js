"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.validateUpdate = exports.validatePost = void 0;
var joi_1 = __importDefault(require("joi"));
var customError_1 = require("../models/entities/customError");
var schemaPost = joi_1["default"].object({
    title: joi_1["default"].string().min(1).max(100).required(),
    description: joi_1["default"].string().min(1).max(100).required(),
    content: joi_1["default"].string().min(1).max(500).required()
});
var schemaUpdate = joi_1["default"].object({
    title: joi_1["default"].string().min(1).max(100),
    description: joi_1["default"].string().min(1).max(100),
    content: joi_1["default"].string().min(1).max(500)
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
//# sourceMappingURL=postValidatorMiddleware.js.map