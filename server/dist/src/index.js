"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var medicalCardRouter_1 = require("./v1/routes/medicalCardRouter");
var customErrorMiddleware_1 = require("./v1/middlewares/customErrorMiddleware");
var prismaErrorMiddleware_1 = require("./v1/middlewares/prismaErrorMiddleware");
var bloodTestRouter_1 = require("./v1/routes/bloodTestRouter");
var bloodTestAnalyteRouter_1 = require("./v1/routes/bloodTestAnalyteRouter");
var genderRouter_1 = require("./v1/routes/genderRouter");
var btaDescriptionRouter_1 = require("./v1/routes/btaDescriptionRouter");
var postRouter_1 = require("./v1/routes/postRouter");
var authenticationRouter_1 = require("./v1/routes/authenticationRouter");
var editorRouter_1 = require("./v1/routes/editorRouter");
var app = (0, express_1["default"])();
//Initial Middleware
app.use(express_1["default"].json());
app.use((0, cors_1["default"])());
//ROUTES V1
var prefixV1 = '/api/v1';
app.use(prefixV1, medicalCardRouter_1.router);
app.use(prefixV1, bloodTestRouter_1.router);
app.use(prefixV1, bloodTestAnalyteRouter_1.router);
app.use(prefixV1, genderRouter_1.router);
app.use(prefixV1, btaDescriptionRouter_1.router);
app.use(prefixV1, postRouter_1.router);
app.use(prefixV1, authenticationRouter_1.router);
app.use(prefixV1, editorRouter_1.router);
//Error Middleware
app.use('*', customErrorMiddleware_1.invalidPath);
app.use(prismaErrorMiddleware_1.prismaErrorHandler);
app.use(customErrorMiddleware_1.errorLogger);
app.use(customErrorMiddleware_1.errorResponder);
var port = 3000;
app.listen(port, function () {
    console.log("Server is running at localhost:".concat(port));
});
//# sourceMappingURL=index.js.map