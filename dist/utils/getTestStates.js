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
var testService_1 = require("./testService");
var testValues_1 = require("./testValues");
exports.default = (function (optsOverrides) {
    if (optsOverrides === void 0) { optsOverrides = {}; }
    return testService_1.default.getStates(__assign({ activityId: testValues_1.TEST_ACTIVITY_ID, agent: testValues_1.TEST_MBOX_AGENT, client: testValues_1.TEST_CLIENT, registration: testValues_1.TEST_REGISTRATION }, optsOverrides));
});
//# sourceMappingURL=getTestStates.js.map