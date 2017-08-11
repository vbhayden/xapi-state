"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkScopes_1 = require("jscommons/dist/service/utils/checkScopes");
var scopes_1 = require("../../utils/scopes");
exports.default = function (scopes) {
    checkScopes_1.default(scopes_1.STATE_WRITE_SCOPES, scopes);
};
//# sourceMappingURL=checkStateWriteScopes.js.map