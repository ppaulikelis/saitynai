"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.invalidUserRole = exports.invalidAuthToken = exports.noAuthHeader = exports.invalidCredentials = exports.duplicateData = exports.invalidRequest = exports.invalidData = exports.resourceNotFound = exports.resourcesNotFound = exports.CustomError = void 0;
var CustomError = /** @class */ (function (_super) {
    __extends(CustomError, _super);
    function CustomError(message, status, shortMsg) {
        if (message === void 0) { message = ''; }
        if (status === void 0) { status = 500; }
        if (shortMsg === void 0) { shortMsg = 'Something went wrong'; }
        var _this = _super.call(this, message) || this;
        _this.status = status;
        _this.shortMsg = shortMsg;
        return _this;
    }
    return CustomError;
}(Error));
exports.CustomError = CustomError;
exports.resourcesNotFound = new CustomError('', 404, 'Resources not found');
exports.resourceNotFound = new CustomError('', 404, 'Resource not found');
exports.invalidData = new CustomError('', 400, 'Data is not valid');
exports.invalidRequest = new CustomError('', 400, 'Request is not valid');
exports.duplicateData = new CustomError('', 400, 'Resource already exists');
exports.invalidCredentials = new CustomError('', 403, 'Invalid credentials');
exports.noAuthHeader = new CustomError('', 401, 'No authorization header found');
exports.invalidAuthToken = new CustomError('', 403, 'Authorization token is not valid');
exports.invalidUserRole = new CustomError('', 403, 'User with this role is not allowed to access this route');
//# sourceMappingURL=customError.js.map