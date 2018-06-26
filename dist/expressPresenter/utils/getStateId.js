"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr_1 = require("rulr");
exports.default = (function (stateIdParam) {
    if (stateIdParam === undefined) {
        var warnings = [rulr_1.createRequiredWarning(stateIdParam, ['query', 'stateId'])];
        throw new rulr_1.Warnings({}, ['query'], warnings);
    }
    return stateIdParam;
});
//# sourceMappingURL=getStateId.js.map