"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr = require("rulr");
var xapi = require("xapi-validation/dist/factory");
var rule = rulr.maybe(xapi.iri);
exports.default = function (data) {
    return rule(data, ['activityId']);
};
//# sourceMappingURL=validateActivityId.js.map