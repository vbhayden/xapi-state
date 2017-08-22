"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../../../../utils/constants");
var testValues_1 = require("../../../../utils/testValues");
var supertest_1 = require("../../utils/supertest");
var options = {
    activityId: testValues_1.TEST_ACTIVITY_ID,
    agent: JSON.stringify(testValues_1.TEST_MBOX_AGENT),
    registration: testValues_1.TEST_REGISTRATION,
};
exports.default = function (optsOverrides) {
    if (optsOverrides === void 0) { optsOverrides = {}; }
    return supertest_1.default
        .delete('/xAPI/activities/state')
        .set('X-Experience-API-Version', constants_1.xapiHeaderVersion)
        .query(__assign({}, options, optsOverrides));
};
//# sourceMappingURL=deleteStates.js.map