"use strict";
exports.__esModule = true;
exports.checkUserRole = void 0;
var customError_1 = require("../models/entities/customError");
function checkUserRole(authToken, role, next) {
    if (authToken.role !== role) {
        next(customError_1.invalidUserRole);
        return false;
    }
    return true;
}
exports.checkUserRole = checkUserRole;
//# sourceMappingURL=rolePermissions.js.map