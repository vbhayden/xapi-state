"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (agent) {
    if (agent.mbox !== undefined) {
        return { 'agent.mbox': agent.mbox };
    }
    if (agent.mbox_sha1sum !== undefined) {
        return { 'agent.mbox_sha1sum': agent.mbox_sha1sum };
    }
    if (agent.openid !== undefined) {
        return { 'agent.openid': agent.openid };
    }
    if (agent.account !== undefined) {
        return {
            'agent.account.homePage': agent.account.homePage,
            'agent.account.name': agent.account.name,
        };
    }
    /* istanbul ignore next */
    throw new Error('Invalid agent IFI');
});
//# sourceMappingURL=getAgentFilter.js.map