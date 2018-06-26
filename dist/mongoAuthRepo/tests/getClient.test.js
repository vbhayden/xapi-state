"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var btoa = require("btoa");
var NoModel_1 = require("jscommons/dist/errors/NoModel");
var assertError_1 = require("jscommons/dist/tests/utils/assertError");
var mongodb_1 = require("mongodb");
var ExpiredClientError_1 = require("../../errors/ExpiredClientError");
var UntrustedClientError_1 = require("../../errors/UntrustedClientError");
var connectToMongoDb_1 = require("../../repoFactory/utils/connectToMongoDb");
var index_1 = require("../index");
var TEST_BASIC_KEY = '123';
var TEST_BASIC_SECRET = 'abc';
var TEST_TOKEN = "Basic " + btoa(TEST_BASIC_KEY + ":" + TEST_BASIC_SECRET);
var TEST_CLIENT = {
    _id: new mongodb_1.ObjectID('5988f0f00000000000000123'),
    api: {
        basic_key: TEST_BASIC_KEY,
        basic_secret: TEST_BASIC_SECRET,
    },
    authority: JSON.stringify({
        mbox: 'mailto:authority@example.com',
        objectType: 'Agent',
    }),
    lrs_id: new mongodb_1.ObjectID('5988f0f00000000000000001'),
    organisation: new mongodb_1.ObjectID('5988f0f00000000000000000'),
};
var TEST_ORG = {
    _id: new mongodb_1.ObjectID('5988f0f00000000000000000'),
    createdAt: new Date('2017-10-25T14:39:44.962Z'),
    name: 'Test Org',
    updatedAt: new Date('2017-10-25T14:39:58.376Z'),
};
var TEST_STORE = {
    _id: new mongodb_1.ObjectID('5988f0f00000000000000001'),
    createdAt: new Date('2017-10-25T14:39:44.962Z'),
    description: 'Test LRS Description',
    organisation: new mongodb_1.ObjectID('5988f0f00000000000000000'),
    statementCount: 0,
    title: 'Test LRS',
    updatedAt: new Date('2017-10-25T14:39:58.376Z'),
};
describe(__filename, function () {
    var connection = connectToMongoDb_1.default();
    var authRepo = index_1.default({ db: connection });
    beforeEach(function () { return __awaiter(_this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.dropDatabase()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should return a client from the db', function () { return __awaiter(_this, void 0, void 0, function () {
        var db, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection('organisations').insertOne(TEST_ORG)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.collection('lrs').insertOne(TEST_STORE)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.collection('client').insertOne(TEST_CLIENT)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, authRepo.getClient({ authToken: TEST_TOKEN })];
                case 5:
                    result = _a.sent();
                    assert.equal(result.client._id, TEST_CLIENT._id);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should error when getting without any clients in the DB', function () { return __awaiter(_this, void 0, void 0, function () {
        var promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    promise = authRepo.getClient({ authToken: TEST_TOKEN });
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should error when getting a untrusted client', function () { return __awaiter(_this, void 0, void 0, function () {
        var db, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection('client').insertOne(__assign({}, TEST_CLIENT, { isTrusted: false }))];
                case 2:
                    _a.sent();
                    promise = authRepo.getClient({ authToken: TEST_TOKEN });
                    return [4 /*yield*/, assertError_1.default(UntrustedClientError_1.default, promise)];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should error when getting a client with a missing store', function () { return __awaiter(_this, void 0, void 0, function () {
        var db, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection('organisations').insertOne(TEST_ORG)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.collection('client').insertOne(TEST_CLIENT)];
                case 3:
                    _a.sent();
                    promise = authRepo.getClient({ authToken: TEST_TOKEN });
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should error when getting a client with a missing org', function () { return __awaiter(_this, void 0, void 0, function () {
        var db, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection('lrs').insertOne(TEST_STORE)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.collection('client').insertOne(TEST_CLIENT)];
                case 3:
                    _a.sent();
                    promise = authRepo.getClient({ authToken: TEST_TOKEN });
                    return [4 /*yield*/, assertError_1.default(NoModel_1.default, promise)];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should error when getting a client with an expired org', function () { return __awaiter(_this, void 0, void 0, function () {
        var db, promise;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection('organisations').insertOne(__assign({}, TEST_ORG, { expiration: new Date() }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.collection('lrs').insertOne(TEST_STORE)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.collection('client').insertOne(TEST_CLIENT)];
                case 4:
                    _a.sent();
                    promise = authRepo.getClient({ authToken: TEST_TOKEN });
                    return [4 /*yield*/, assertError_1.default(ExpiredClientError_1.default, promise)];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not error when getting a client with an renewed org', function () { return __awaiter(_this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection()];
                case 1:
                    db = _a.sent();
                    return [4 /*yield*/, db.collection('organisations').insertOne(__assign({}, TEST_ORG, { expiration: null }))];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, db.collection('lrs').insertOne(TEST_STORE)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, db.collection('client').insertOne(TEST_CLIENT)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, authRepo.getClient({ authToken: TEST_TOKEN })];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=getClient.test.js.map