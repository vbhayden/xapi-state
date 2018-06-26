"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (updatedAt, since) {
    if (since === undefined) {
        return true;
    }
    return updatedAt > since;
});
//# sourceMappingURL=isMatchingSince.js.map