"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sha1 = require("sha1");
var uuid_1 = require("uuid");
exports.default = function () {
    var id = uuid_1.v4();
    var timestamp = (new Date()).toISOString();
    return sha1(id + "-" + timestamp);
};
//# sourceMappingURL=createEtag.js.map