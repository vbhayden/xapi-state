"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-file-line-count
var assert = require("assert");
var NoModel_1 = require("jscommons/dist/errors/NoModel");
var assertError_1 = require("jscommons/dist/tests/utils/assertError");
var streamToString = require("stream-to-string");
var createJsonState_1 = require("../../../utils/createJsonState");
var createTextState_1 = require("../../../utils/createTextState");
var getTestState_1 = require("../../../utils/getTestState");
var testValues_1 = require("../../../utils/testValues");
var setup_1 = require("../utils/setup");
describe('getState with existing state', function () {
    setup_1.default();
    var assertGetState = function (result, content, contentType) { return __awaiter(_this, void 0, void 0, function () {
        var actualContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, streamToString(result.content)];
                case 1:
                    actualContent = _a.sent();
                    assert.equal(actualContent, content);
                    assert.equal(result.contentType, contentType);
                    assert.equal(result.updatedAt.constructor, Date);
                    assert.equal(result.etag.constructor, String);
                    return [2 /*return*/];
            }
        });
    }); };
    it('should get when getting text', function () { return __awaiter(_this, void 0, void 0, function () {
        var agentStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTextState_1.default()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTestState_1.default()];
                case 2:
                    agentStateResult = _a.sent();
                    return [4 /*yield*/, assertGetState(agentStateResult, testValues_1.TEST_CONTENT, testValues_1.TEXT_CONTENT_TYPE)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get when agent properties are in a different order', function () { return __awaiter(_this, void 0, void 0, function () {
        var creationAgent, retrievalAgent, agentStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    creationAgent = {
                        objectType: 'Agent',
                        account: {
                            name: 'steely.eyed',
                            homePage: 'http://missile.man',
                        },
                    };
                    retrievalAgent = {
                        objectType: 'Agent',
                        account: {
                            homePage: 'http://missile.man',
                            name: 'steely.eyed',
                        },
                    };
                    // tslint:enable:object-literal-sort-keys
                    return [4 /*yield*/, createTextState_1.default({ agent: creationAgent })];
                case 1:
                    // tslint:enable:object-literal-sort-keys
                    _a.sent();
                    return [4 /*yield*/, getTestState_1.default({ agent: retrievalAgent })];
                case 2:
                    agentStateResult = _a.sent();
                    return [4 /*yield*/, assertGetState(agentStateResult, testValues_1.TEST_CONTENT, testValues_1.TEXT_CONTENT_TYPE)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get when getting json', function () { return __awaiter(_this, void 0, void 0, function () {
        var agentStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createJsonState_1.default()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTestState_1.default()];
                case 2:
                    agentStateResult = _a.sent();
                    return [4 /*yield*/, assertGetState(agentStateResult, testValues_1.TEST_JSON_CONTENT, testValues_1.JSON_CONTENT_TYPE)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get when not using registration', function () { return __awaiter(_this, void 0, void 0, function () {
        var agentStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTextState_1.default()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTestState_1.default({
                            registration: undefined,
                        })];
                case 2:
                    agentStateResult = _a.sent();
                    return [4 /*yield*/, assertGetState(agentStateResult, testValues_1.TEST_CONTENT, testValues_1.TEXT_CONTENT_TYPE)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should error when getting existing model without a registration with one', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTextState_1.default({ registration: undefined })];
                case 1:
                    _a.sent();
                    promise = getTestState_1.default();
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get when using an mbox', function () { return __awaiter(_this, void 0, void 0, function () {
        var agentStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTextState_1.default({ agent: testValues_1.TEST_MBOX_AGENT })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTestState_1.default({ agent: testValues_1.TEST_MBOX_AGENT })];
                case 2:
                    agentStateResult = _a.sent();
                    return [4 /*yield*/, assertGetState(agentStateResult, testValues_1.TEST_CONTENT, testValues_1.TEXT_CONTENT_TYPE)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get when using an mbox_sha1sum', function () { return __awaiter(_this, void 0, void 0, function () {
        var agentStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTextState_1.default({ agent: testValues_1.TEST_MBOXSHA1_AGENT })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTestState_1.default({ agent: testValues_1.TEST_MBOXSHA1_AGENT })];
                case 2:
                    agentStateResult = _a.sent();
                    return [4 /*yield*/, assertGetState(agentStateResult, testValues_1.TEST_CONTENT, testValues_1.TEXT_CONTENT_TYPE)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get when using an openid', function () { return __awaiter(_this, void 0, void 0, function () {
        var agentStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTextState_1.default({ agent: testValues_1.TEST_OPENID_AGENT })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTestState_1.default({ agent: testValues_1.TEST_OPENID_AGENT })];
                case 2:
                    agentStateResult = _a.sent();
                    return [4 /*yield*/, assertGetState(agentStateResult, testValues_1.TEST_CONTENT, testValues_1.TEXT_CONTENT_TYPE)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should get when using an account', function () { return __awaiter(_this, void 0, void 0, function () {
        var agentStateResult;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, createTextState_1.default({ agent: testValues_1.TEST_ACCOUNT_AGENT })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getTestState_1.default({ agent: testValues_1.TEST_ACCOUNT_AGENT })];
                case 2:
                    agentStateResult = _a.sent();
                    return [4 /*yield*/, assertGetState(agentStateResult, testValues_1.TEST_CONTENT, testValues_1.TEXT_CONTENT_TYPE)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=getExistingState.test.js.map