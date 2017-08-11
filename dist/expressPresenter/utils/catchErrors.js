"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var handleError_1 = require("../utils/handleError");
exports.default = function (config, handler) {
    var logger = config.logger;
    var translator = config.translator;
    return function (req, res) {
        handler(req, res).catch(function (err) {
            var errorId = uuid_1.v4();
            logger.error(errorId, err);
            return handleError_1.default({ translator: translator, errorId: errorId, res: res, err: err });
        });
    };
};
//# sourceMappingURL=catchErrors.js.map