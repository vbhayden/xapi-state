"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xapi = require("@learninglocker/xapi-validation/dist/factory");
var rulr = require("rulr");
exports.default = (function (data) {
    return rulr.maybe(xapi.timestamp)(data, ['since']);
});
//# sourceMappingURL=validateSince.js.map