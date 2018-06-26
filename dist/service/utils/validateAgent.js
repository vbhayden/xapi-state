"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var xapi = require("@learninglocker/xapi-validation/dist/factory");
var IfiCountWarning_1 = require("@learninglocker/xapi-validation/dist/warnings/IfiCountWarning");
var NoIfiWarning_1 = require("@learninglocker/xapi-validation/dist/warnings/NoIfiWarning");
var lodash_1 = require("lodash");
var rulr = require("rulr");
var rule = rulr.maybe(rulr.composeRules([
    rulr.restrictToSchema({
        account: rulr.optional(xapi.account),
        mbox: rulr.optional(xapi.mailto),
        mbox_sha1sum: rulr.optional(xapi.sha1),
        name: rulr.optional(xapi.stringValue),
        objectType: rulr.optional(xapi.stringValue),
        openid: rulr.optional(xapi.iri),
    }),
    function (data, path) {
        var trimmedAgent = lodash_1.pick(data, ['account', 'mbox', 'mbox_sha1sum', 'openid']);
        var keys = Object.keys(trimmedAgent);
        if (keys.length > 1) {
            return [new IfiCountWarning_1.default(data, path, keys)];
        }
        if (keys.length === 0) {
            return [new NoIfiWarning_1.default(data, path)];
        }
        return [];
    },
]));
exports.default = (function (data) {
    return rule(data, ['agent']);
});
//# sourceMappingURL=validateAgent.js.map