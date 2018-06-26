"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr_1 = require("rulr");
exports.default = (function (activityIdParam) {
    if (activityIdParam === undefined) {
        var warnings = [rulr_1.createRequiredWarning(activityIdParam, ['query', 'activityId'])];
        throw new rulr_1.Warnings({}, ['query'], warnings);
    }
    return activityIdParam;
});
//# sourceMappingURL=getActivityId.js.map