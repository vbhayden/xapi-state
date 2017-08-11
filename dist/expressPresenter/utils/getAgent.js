"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr_1 = require("rulr");
exports.default = function (agentParam) {
    if (agentParam === undefined) {
        var warnings = [rulr_1.createRequiredWarning(agentParam, ['query', 'agent'])];
        throw new rulr_1.Warnings({}, ['query'], warnings);
    }
    return JSON.parse(agentParam);
};
//# sourceMappingURL=getAgent.js.map