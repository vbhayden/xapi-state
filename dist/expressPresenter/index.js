"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expressPresenter_1 = require("jscommons/dist/expressPresenter");
var deleteState_1 = require("./deleteState");
var getStates_1 = require("./getStates");
var postState_1 = require("./postState");
var putState_1 = require("./putState");
exports.default = function (config) {
    var router = expressPresenter_1.default(config);
    router.delete('/xAPI/activities/state', deleteState_1.default(config));
    router.get('/xAPI/activities/state', getStates_1.default(config));
    router.put('/xAPI/activities/state', putState_1.default(config));
    router.post('/xAPI/activities/state', postState_1.default(config));
    return router;
};
//# sourceMappingURL=index.js.map