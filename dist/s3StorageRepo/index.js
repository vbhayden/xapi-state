"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var s3Repo_1 = require("jscommons/dist/s3Repo");
var deleteStateContent_1 = require("./deleteStateContent");
var deleteStatesContent_1 = require("./deleteStatesContent");
var getStateContent_1 = require("./getStateContent");
var storeStateContent_1 = require("./storeStateContent");
exports.default = function (config) {
    return __assign({ deleteStateContent: deleteStateContent_1.default(config), deleteStatesContent: deleteStatesContent_1.default(config), getStateContent: getStateContent_1.default(config), storeStateContent: storeStateContent_1.default(config) }, s3Repo_1.default(config));
};
//# sourceMappingURL=index.js.map