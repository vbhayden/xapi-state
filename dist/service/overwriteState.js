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
var getFileExtension_1 = require("../utils/getFileExtension");
var checkStateWriteScopes_1 = require("./utils/checkStateWriteScopes");
var createEtag_1 = require("./utils/createEtag");
var getContent_1 = require("./utils/getContent");
var validateActivityId_1 = require("./utils/validateActivityId");
var validateAgent_1 = require("./utils/validateAgent");
var validateRegistration_1 = require("./utils/validateRegistration");
exports.default = (function (config) {
    return function (opts) { return __awaiter(_this, void 0, void 0, function () {
        var etag, _a, content, contentType, extension, overwriteStateResult;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    checkStateWriteScopes_1.default(opts.client.scopes);
                    validateActivityId_1.default(opts.activityId);
                    validateAgent_1.default(opts.agent);
                    validateRegistration_1.default(opts.registration);
                    etag = createEtag_1.default();
                    return [4 /*yield*/, getContent_1.default({
                            contentType: opts.contentType,
                            stream: opts.content,
                        })];
                case 1:
                    _a = _b.sent(), content = _a.content, contentType = _a.contentType;
                    extension = getFileExtension_1.default(contentType);
                    return [4 /*yield*/, config.repo.overwriteState({
                            activityId: opts.activityId,
                            agent: opts.agent,
                            client: opts.client,
                            content: content,
                            contentType: contentType,
                            etag: etag,
                            extension: extension,
                            registration: opts.registration,
                            stateId: opts.stateId,
                        })];
                case 2:
                    overwriteStateResult = _b.sent();
                    if (!(content === undefined)) return [3 /*break*/, 4];
                    return [4 /*yield*/, config.repo.storeStateContent({
                            content: opts.content,
                            contentType: contentType,
                            key: overwriteStateResult.id + "." + extension,
                            lrs_id: opts.client.lrs_id,
                        })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
});
//# sourceMappingURL=overwriteState.js.map