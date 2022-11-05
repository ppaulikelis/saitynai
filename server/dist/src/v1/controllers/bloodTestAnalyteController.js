"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.remove = exports.update = exports.get = exports.post = exports.getAll = void 0;
var customError_1 = require("../models/entities/customError");
var bloodTestAnalyteService_1 = require("../services/bloodTestAnalyteService");
function getAll(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var bloodTestAnalytes, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, bloodTestAnalyteService_1.getBloodTestAnalytes)(Number(req.query.page), Number(req.query.count), Number(req.params.bloodTestId), Number(req.params.medicalCardId), req.authToken.id)];
                case 1:
                    bloodTestAnalytes = _a.sent();
                    if (bloodTestAnalytes.length == 0) {
                        next(customError_1.resourcesNotFound);
                    }
                    else {
                        res.status(200).json(bloodTestAnalytes);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAll = getAll;
function post(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var bloodTestAnalyte, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, bloodTestAnalyteService_1.postBloodTestAnalyte)(__assign(__assign({}, req.body), { bloodTestId: Number(req.params.bloodTestId) }))];
                case 1:
                    bloodTestAnalyte = _a.sent();
                    res.status(201).json(bloodTestAnalyte);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    next(error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.post = post;
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var bloodTestAnalyte, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, bloodTestAnalyteService_1.getBloodTestAnalyte)(Number(req.params.bloodTestAnalyteId), Number(req.params.bloodTestId), Number(req.params.medicalCardId), req.authToken.id)];
                case 1:
                    bloodTestAnalyte = _a.sent();
                    if (bloodTestAnalyte == null) {
                        next(customError_1.resourceNotFound);
                    }
                    else {
                        res.status(200).json(bloodTestAnalyte);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    next(error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.get = get;
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var bloodTestAnalyte, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, bloodTestAnalyteService_1.updateBloodTestAnalyte)(Number(req.params.bloodTestAnalyteId), req.body)];
                case 1:
                    bloodTestAnalyte = _a.sent();
                    res.status(200).json(bloodTestAnalyte);
                    return [3 /*break*/, 3];
                case 2:
                    error_4 = _a.sent();
                    next(error_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.update = update;
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, (0, bloodTestAnalyteService_1.deleteBloodTestAnalyte)(Number(req.params.bloodTestAnalyteId))];
                case 1:
                    _a.sent();
                    res.status(204).json();
                    return [3 /*break*/, 3];
                case 2:
                    error_5 = _a.sent();
                    next(error_5);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.remove = remove;
//# sourceMappingURL=bloodTestAnalyteController.js.map