"use strict";
exports.__esModule = true;
exports.errorResponder = exports.errorLogger = exports.invalidPath = void 0;
function invalidPath(request, response) {
    var status = 404;
    response.status(status).json({
        status: status,
        message: 'Api route not found'
    });
}
exports.invalidPath = invalidPath;
function errorLogger(error, request, response, next) {
    if (error.message !== '')
        console.log(error.message);
    next(error);
}
exports.errorLogger = errorLogger;
function errorResponder(error, request, response, next) {
    var status = error.status || 500;
    var shortMsg = error.shortMsg || 'Something went wrong';
    response.status(status).json({
        status: status,
        message: shortMsg
    });
}
exports.errorResponder = errorResponder;
//# sourceMappingURL=customErrorMiddleware.js.map