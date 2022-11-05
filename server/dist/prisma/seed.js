"use strict";
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
var client_1 = require("@prisma/client");
var bloodTestAnalyteDescriptions_1 = require("./data/bloodTestAnalyteDescriptions");
var bloodTestAnalytes_1 = require("./data/bloodTestAnalytes");
var bloodTests_1 = require("./data/bloodTests");
var genders_1 = require("./data/genders");
var medicalCards_1 = require("./data/medicalCards");
var posts_1 = require("./data/posts");
var users_1 = require("./data/users");
var prisma = new client_1.PrismaClient();
var Seed = /** @class */ (function () {
    function Seed() {
        var _this = this;
        this.main = function () { return __awaiter(_this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 15, , 16]);
                        //delete data
                        return [4 /*yield*/, prisma.bloodTestAnalyte.deleteMany()];
                    case 1:
                        //delete data
                        _a.sent();
                        return [4 /*yield*/, prisma.bloodTest.deleteMany()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, prisma.medicalCard.deleteMany()];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, prisma.post.deleteMany()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, prisma.user.deleteMany()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, prisma.gender.deleteMany()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, prisma.bloodTestAnalyteDescription.deleteMany()];
                    case 7:
                        _a.sent();
                        //add data
                        return [4 /*yield*/, this.addGenders()];
                    case 8:
                        //add data
                        _a.sent();
                        return [4 /*yield*/, this.addBloodTestAnalyteDescriptions()];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.addUsers()];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, this.addMedicalCards()];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, this.addPosts()];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.addBloodTests()];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.addBloodTestAnalytes()];
                    case 14:
                        _a.sent();
                        return [3 /*break*/, 16];
                    case 15:
                        error_1 = _a.sent();
                        console.log(error_1);
                        return [3 /*break*/, 16];
                    case 16: return [2 /*return*/];
                }
            });
        }); };
        this.addGenders = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, genders_2, gender;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, genders_2 = genders_1.genders;
                        _a.label = 1;
                    case 1:
                        if (!(_i < genders_2.length)) return [3 /*break*/, 4];
                        gender = genders_2[_i];
                        return [4 /*yield*/, prisma.gender.create({
                                data: gender
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addBloodTestAnalyteDescriptions = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, bloodTestAnalyteDescriptions_2, bloodTestAnalyteDescription;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, bloodTestAnalyteDescriptions_2 = bloodTestAnalyteDescriptions_1.bloodTestAnalyteDescriptions;
                        _a.label = 1;
                    case 1:
                        if (!(_i < bloodTestAnalyteDescriptions_2.length)) return [3 /*break*/, 4];
                        bloodTestAnalyteDescription = bloodTestAnalyteDescriptions_2[_i];
                        return [4 /*yield*/, prisma.bloodTestAnalyteDescription.create({
                                data: bloodTestAnalyteDescription
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addUsers = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, users_2, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, users_2 = users_1.users;
                        _a.label = 1;
                    case 1:
                        if (!(_i < users_2.length)) return [3 /*break*/, 4];
                        user = users_2[_i];
                        return [4 /*yield*/, prisma.user.create({
                                data: user
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addMedicalCards = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, medicalCards_2, medicalCard;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, medicalCards_2 = medicalCards_1.medicalCards;
                        _a.label = 1;
                    case 1:
                        if (!(_i < medicalCards_2.length)) return [3 /*break*/, 4];
                        medicalCard = medicalCards_2[_i];
                        return [4 /*yield*/, prisma.medicalCard.create({
                                data: medicalCard
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addPosts = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, posts_2, post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, posts_2 = posts_1.posts;
                        _a.label = 1;
                    case 1:
                        if (!(_i < posts_2.length)) return [3 /*break*/, 4];
                        post = posts_2[_i];
                        return [4 /*yield*/, prisma.post.create({
                                data: post
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addBloodTests = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, bloodTests_2, bloodTest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, bloodTests_2 = bloodTests_1.bloodTests;
                        _a.label = 1;
                    case 1:
                        if (!(_i < bloodTests_2.length)) return [3 /*break*/, 4];
                        bloodTest = bloodTests_2[_i];
                        return [4 /*yield*/, prisma.bloodTest.create({
                                data: bloodTest
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        this.addBloodTestAnalytes = function () { return __awaiter(_this, void 0, void 0, function () {
            var _i, bloodTestAnalytes_2, bloodTestAnalyte;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, bloodTestAnalytes_2 = bloodTestAnalytes_1.bloodTestAnalytes;
                        _a.label = 1;
                    case 1:
                        if (!(_i < bloodTestAnalytes_2.length)) return [3 /*break*/, 4];
                        bloodTestAnalyte = bloodTestAnalytes_2[_i];
                        return [4 /*yield*/, prisma.bloodTestAnalyte.create({
                                data: bloodTestAnalyte
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
    }
    return Seed;
}());
var seed = new Seed();
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, seed.main()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
main()["catch"](function (err) {
    console.log(err);
    process.exit(1);
})["finally"](function () {
    prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map