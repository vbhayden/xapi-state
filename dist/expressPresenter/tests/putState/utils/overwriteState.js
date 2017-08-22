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
exports.default = function (optsOverrides, content, contentType, sendVersion) {
    if (optsOverrides === void 0) { optsOverrides = {}; }
    if (content === void 0) { content = testValues_1.TEST_CONTENT; }
    if (contentType === void 0) { contentType = testValues_1.TEXT_CONTENT_TYPE; }
    if (sendVersion === void 0) { sendVersion = true; }
    var activityId = testValues_1.TEST_ACTIVITY_ID;
    var stateId = testValues_1.TEST_STATE_ID;
    var agent = JSON.stringify(testValues_1.TEST_MBOX_AGENT);
    var registration = testValues_1.TEST_REGISTRATION;
    var req = supertest_1.default
        .put('/xAPI/activities/state')
        .set('Content-Type', contentType);
    if (sendVersion) {
        req.set('X-Experience-API-Version', constants_1.xapiHeaderVersion);
    }
    return req.query(__assign({ activityId: activityId,
        agent: agent,
        registration: registration,
        stateId: stateId }, optsOverrides))
        .send(content);
};
//# sourceMappingURL=overwriteState.js.map