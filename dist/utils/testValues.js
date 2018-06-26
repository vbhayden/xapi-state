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
var constants_1 = require("../utils/constants");
var scopes_1 = require("./scopes");
exports.TEST_CLIENT = {
    _id: '58fe13e34effd3c26a7fc4b8',
    isTrusted: true,
    lrs_id: '58fe13e34effd3c26a7fc4b7',
    organisation: '58fe13e34effd3c26a7fc4b6',
    scopes: [scopes_1.ALL],
};
exports.TEST_INVALID_SCOPE_TOKEN = 'invalid_scope_client';
exports.TEST_INVALID_SCOPE_CLIENT = __assign({}, exports.TEST_CLIENT, { scopes: ['invalid_scope'] });
exports.TEST_VALID_SCOPE_TOKEN = 'valid_scope_client';
exports.TEST_VALID_SCOPE_CLIENT = __assign({}, exports.TEST_CLIENT, { scopes: [scopes_1.XAPI_STATE_ALL] });
exports.TEST_OUTSIDE_STORE_TOKEN = 'outside_store_client';
exports.TEST_CLIENT_OUTSIDE_STORE = __assign({}, exports.TEST_CLIENT, { lrs_id: '58fe13e34effd3c26a7fc4c7' });
exports.TEST_OUTSIDE_ORG_TOKEN = 'outside_org_client';
exports.TEST_CLIENT_OUTSIDE_ORG = __assign({}, exports.TEST_CLIENT, { organisation: '58fe13e34effd3c26a7fc4c6' });
exports.TEST_UNTRUSTED_TOKEN = 'untrusted_client';
exports.TEST_EXPIRED_ORG_TOKEN = 'expired_org_client';
exports.TEST_MISSING_TOKEN = 'Basic missing_token';
exports.TEST_ACTIVITY_ID = 'http://www.example.com';
exports.TEST_IMMUTABLE_ACTIVITY_ID = 'http://www.example.org';
exports.TEST_INVALID_ACTIVITY_ID = 'http';
exports.TEST_STATE_ID = 'dummy_state_id';
exports.TEST_INVALID_TIMESTAMP = '2';
exports.TEST_CONTENT = 'dummy_content';
exports.TEST_IMMUTABLE_CONTENT = 'immutable_content';
exports.TEST_JSON_CONTENT = '[]';
exports.TEST_OBJECT_CONTENT = '{"foo":1}';
exports.TEST_OBJECT_PATCH_CONTENT = '{"bar":2}';
exports.TEST_OBJECT_MERGED_CONTENT = '{"foo":1,"bar":2}';
exports.TEXT_CONTENT_TYPE = 'text/plain';
exports.JSON_CONTENT_TYPE = constants_1.jsonContentType;
exports.ALTERNATE_CONTENT_TYPE = 'application/x-www-form-urlencoded';
exports.TEST_MBOX_AGENT = {
    mbox: 'mailto:test_agent@example.org',
};
exports.TEST_MBOX_AGENT_2 = {
    mbox: 'mailto:another_test_agent@example.org',
};
exports.TEST_MBOXSHA1_AGENT = {
    mbox_sha1sum: 'aabbd60ef591bcc908fff6fd2571e8ef8d62461f',
};
exports.TEST_OPENID_AGENT = {
    openid: 'http://www.example.com',
};
exports.TEST_ACCOUNT_AGENT = {
    account: {
        homePage: 'http://www.example.org',
        name: 'dummy_account_nane',
    },
};
exports.TEST_INVALID_AGENT = {
    mbox: 'hello',
};
exports.TEST_REGISTRATION = '79c60bd0-ebb6-4968-8b57-952b080b8261';
exports.TEST_INVALID_REGISTRATION = '79c60bd0-ebb6-4968-8b57-952b080b826';
//# sourceMappingURL=testValues.js.map