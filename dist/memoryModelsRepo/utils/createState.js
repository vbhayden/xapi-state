"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
exports.default = function (config, opts) {
    var state = {
        activityId: opts.activityId,
        agent: opts.agent,
        content: opts.content,
        contentType: opts.contentType,
        etag: opts.etag,
        id: uuid_1.v4(),
        lrs: opts.client.lrs_id,
        organisation: opts.client.organisation,
        registration: opts.registration,
        stateId: opts.stateId,
        updatedAt: new Date(),
    };
    config.state.states = config.state.states.concat([
        state,
    ]);
    return state;
};
//# sourceMappingURL=createState.js.map