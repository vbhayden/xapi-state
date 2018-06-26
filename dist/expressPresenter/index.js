"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("jscommons/dist/expressPresenter/mixins/cors");
var helmet_1 = require("jscommons/dist/expressPresenter/mixins/helmet");
var morgan_1 = require("jscommons/dist/expressPresenter/mixins/morgan");
var deleteState_1 = require("./deleteState");
var getStates_1 = require("./getStates");
var postState_1 = require("./postState");
var putState_1 = require("./putState");
exports.default = (function (config) {
    var router = express_1.Router();
    router.use(cors_1.default());
    router.use(helmet_1.default());
    router.use(morgan_1.default(config.morganDirectory));
    router.delete('', deleteState_1.default(config));
    router.get('', getStates_1.default(config));
    router.put('', putState_1.default(config));
    router.post('', postState_1.default(config));
    return router;
});
//# sourceMappingURL=index.js.map