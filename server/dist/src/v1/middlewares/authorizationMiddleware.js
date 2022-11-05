"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.checkUserRole = exports.authenticateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var customError_1 = require("../models/entities/customError");
function authenticateToken(req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null) {
        next(customError_1.noAuthHeader);
        return;
    }
    jsonwebtoken_1["default"].verify(token, String(process.env.ACCESS_TOKEN_SECRET), function (err, user) {
        if (err) {
            next(customError_1.invalidAuthToken);
            return;
        }
        req.authToken = user;
        next();
    });
}
exports.authenticateToken = authenticateToken;
function checkUserRole(authToken, role) {
    return authToken.role === role;
}
exports.checkUserRole = checkUserRole;
//# sourceMappingURL=authorizationMiddleware.js.map