"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("@learninglocker/xapi-validation/dist/factory");
var rulr = require("rulr");
var versionHeaderValidator = rulr.maybe(rulr.required(factory_1.version));
exports.default = (function (headerVal) {
    versionHeaderValidator(headerVal, ['header', 'X-Experience-API-Version']);
});
//# sourceMappingURL=validateVersionHeader.js.map