"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rulr_1 = require("rulr");
var constants_1 = require("../../utils/constants");
var contentTypePatterns_1 = require("../../utils/contentTypePatterns");
exports.default = (function (contentTypeHeader) {
    /* istanbul ignore next - superagent always sends a content type */
    if (contentTypeHeader === undefined) {
        var warnings = [rulr_1.createRequiredWarning(contentTypeHeader, ['headers', 'Content-Type'])];
        throw new rulr_1.Warnings({}, ['headers'], warnings);
    }
    if (contentTypePatterns_1.jsonContentTypePattern.test(contentTypeHeader)) {
        return constants_1.jsonContentType;
    }
    return contentTypeHeader;
});
//# sourceMappingURL=getContentType.js.map