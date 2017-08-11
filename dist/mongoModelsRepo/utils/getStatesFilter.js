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
var mongodb_1 = require("mongodb");
var getAgentFilter_1 = require("./getAgentFilter");
var getRegistrationFilter_1 = require("./getRegistrationFilter");
exports.default = function (opts) {
    return __assign({ activityId: opts.activityId }, getAgentFilter_1.default(opts.agent), getRegistrationFilter_1.default(opts.registration), { lrs: new mongodb_1.ObjectID(opts.client.lrs_id), organisation: new mongodb_1.ObjectID(opts.client.organisation) });
};
//# sourceMappingURL=getStatesFilter.js.map