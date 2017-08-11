"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr_1 = require("rulr");
exports.default = function (contentTypeHeader) {
    /* istanbul ignore next - superagent always sends a content type */
    if (contentTypeHeader === undefined) {
        var warnings = [rulr_1.createRequiredWarning(contentTypeHeader, ['headers', 'Content-Type'])];
        throw new rulr_1.Warnings({}, ['headers'], warnings);
    }
    return contentTypeHeader;
};
//# sourceMappingURL=getContentType.js.map