"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mime_types_1 = require("mime-types");
var constants_1 = require("../utils/constants");
exports.default = (function (contentType) {
    if (contentType === constants_1.jsonContentType) {
        return 'json';
    }
    var ext = mime_types_1.extension(contentType);
    if (ext === false) {
        return 'bin';
    }
    return ext;
});
//# sourceMappingURL=getFileExtension.js.map