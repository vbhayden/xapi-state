"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr = require("rulr");
var xapi = require("xapi-validation/dist/factory");
var rule = rulr.maybe(rulr.optional(xapi.uuid));
exports.default = function (data) {
    return rule(data, ['registration']);
};
//# sourceMappingURL=validateRegistration.js.map