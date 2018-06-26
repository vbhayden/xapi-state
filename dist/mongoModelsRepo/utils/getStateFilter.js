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
var getStatesFilter_1 = require("./getStatesFilter");
exports.default = (function (opts) {
    return __assign({ stateId: opts.stateId }, getStatesFilter_1.default(opts));
});
//# sourceMappingURL=getStateFilter.js.map