"use strict";
exports.__esModule = true;
exports.prismaErrorHandler = void 0;
var client_1 = require("@prisma/client");
var customError_1 = require("../models/entities/customError");
function prismaErrorHandler(error, request, response, next) {
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        console.log('PrismaClientKnownRequestError');
        console.log(error.code);
        if (error.code === 'P2025') {
            next(customError_1.resourceNotFound);
        }
        if (error.code === 'P2002') {
            next(customError_1.duplicateData);
        }
        else {
            next(new customError_1.CustomError(error.message));
        }
    }
    else if (error instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        console.log('PrismaClientUnknownRequestError');
        next(new customError_1.CustomError(error.message));
    }
    else if (error instanceof client_1.Prisma.PrismaClientRustPanicError) {
        console.log('PrismaClientRustPanicError');
        next(new customError_1.CustomError(error.message));
    }
    else if (error instanceof client_1.Prisma.PrismaClientInitializationError) {
        console.log('PrismaClientInitializationError');
        next(new customError_1.CustomError(error.message));
    }
    else if (error instanceof client_1.Prisma.PrismaClientValidationError) {
        console.log('PrismaClientValidationError');
        next(customError_1.invalidRequest);
    }
    else {
        next(error);
    }
}
exports.prismaErrorHandler = prismaErrorHandler;
//# sourceMappingURL=prismaErrorMiddleware.js.map