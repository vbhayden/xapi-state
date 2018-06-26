"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (since) {
    if (since === undefined) {
        return {};
    }
    return { updatedAt: { $gt: since } };
});
//# sourceMappingURL=getSinceFilter.js.map