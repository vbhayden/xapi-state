"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingAgent_1 = require("./isMatchingAgent");
var isMatchingRegistration_1 = require("./isMatchingRegistration");
exports.default = function (state, opts) {
    return (state.activityId === opts.activityId &&
        isMatchingAgent_1.default(state.agent, opts.agent) &&
        isMatchingRegistration_1.default(state.registration, opts.registration) &&
        state.lrs === opts.client.lrs_id &&
        state.organisation === opts.client.organisation);
};
//# sourceMappingURL=isMatchingStates.js.map