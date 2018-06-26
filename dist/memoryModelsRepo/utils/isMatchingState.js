"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isMatchingStates_1 = require("./isMatchingStates");
exports.default = (function (state, opts) {
    return (state.stateId === opts.stateId &&
        isMatchingStates_1.default(state, opts));
});
//# sourceMappingURL=isMatchingState.js.map