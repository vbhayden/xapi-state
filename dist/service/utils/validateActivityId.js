"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xapi = require("@learninglocker/xapi-validation/dist/factory");
var rulr = require("rulr");
var rule = rulr.maybe(xapi.iri);
exports.default = (function (data) {
    return rule(data, ['activityId']);
});
//# sourceMappingURL=validateActivityId.js.map