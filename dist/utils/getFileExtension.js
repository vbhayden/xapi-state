"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mime_types_1 = require("mime-types");
exports.default = function (contentType) {
    if (contentType === 'application/json') {
        return 'json';
    }
    var ext = mime_types_1.extension(contentType);
    if (ext === false) {
        return 'bin';
    }
    return ext;
};
//# sourceMappingURL=getFileExtension.js.map