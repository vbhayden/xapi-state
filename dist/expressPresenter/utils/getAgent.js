"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr_1 = require("rulr");
var parseJSON_1 = require("../../utils/parseJSON");
exports.default = (function (agentParam) {
    if (agentParam === undefined) {
        var warnings = [rulr_1.createRequiredWarning(agentParam, ['query', 'agent'])];
        throw new rulr_1.Warnings({}, ['query'], warnings);
    }
    return parseJSON_1.default(agentParam, ['query', 'agent']);
});
//# sourceMappingURL=getAgent.js.map