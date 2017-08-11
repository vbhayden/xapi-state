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
var testValues_1 = require("../../../../utils/testValues");
var supertest_1 = require("../../utils/supertest");
exports.default = function (optsOverrides) {
    if (optsOverrides === void 0) { optsOverrides = {}; }
    var activityId = testValues_1.TEST_ACTIVITY_ID;
    var agent = JSON.stringify(testValues_1.TEST_MBOX_AGENT);
    var registration = testValues_1.TEST_REGISTRATION;
    var stateId = testValues_1.TEST_STATE_ID;
    return supertest_1.default
        .get('/xAPI/activities/state')
        .query(__assign({ activityId: activityId,
        agent: agent,
        registration: registration,
        stateId: stateId }, optsOverrides));
};
//# sourceMappingURL=getState.js.map