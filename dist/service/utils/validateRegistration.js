"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xapi = require("@learninglocker/xapi-validation/dist/factory");
var rulr = require("rulr");
var rule = rulr.maybe(rulr.optional(xapi.uuid));
exports.default = (function (data) {
    return rule(data, ['registration']);
});
//# sourceMappingURL=validateRegistration.js.map