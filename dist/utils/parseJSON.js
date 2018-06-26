"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JsonSyntaxError_1 = require("../errors/JsonSyntaxError");
exports.default = (function (data, path) {
    try {
        return JSON.parse(data);
    }
    catch (err) {
        if (err instanceof SyntaxError) {
            throw new JsonSyntaxError_1.default(path);
        }
    }
});
//# sourceMappingURL=parseJSON.js.map