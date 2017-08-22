"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var patchState_1 = require("./patchState");
exports.default = function (content, contentType, sendVersion) {
    if (sendVersion === void 0) { sendVersion = true; }
    return patchState_1.default({}, content, contentType, sendVersion);
};
//# sourceMappingURL=patchContent.js.map