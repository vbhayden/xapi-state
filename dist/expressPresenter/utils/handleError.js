"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var handleError_1 = require("jscommons/dist/expressPresenter/utils/handleError");
var sendMessage_1 = require("jscommons/dist/expressPresenter/utils/sendMessage");
var sendObject_1 = require("jscommons/dist/expressPresenter/utils/sendObject");
var rulr_1 = require("rulr");
var ExpiredClientError_1 = require("../../errors/ExpiredClientError");
var InvalidMethod_1 = require("../../errors/InvalidMethod");
var JsonSyntaxError_1 = require("../../errors/JsonSyntaxError");
var NonJsonObject_1 = require("../../errors/NonJsonObject");
var UntrustedClientError_1 = require("../../errors/UntrustedClientError");
var constants_1 = require("../../utils/constants");
var translateWarning_1 = require("./translateWarning");
exports.default = (function (_a) {
    var config = _a.config, errorId = _a.errorId, res = _a.res, err = _a.err;
    var logger = config.logger, translator = config.translator;
    var logError = function (msg, meta) {
        logger.error(errorId + ": xapi-state handled - " + msg, meta);
    };
    res.setHeader('X-Experience-API-Version', constants_1.xapiHeaderVersion);
    if (err instanceof JsonSyntaxError_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.jsonSyntaxError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof NonJsonObject_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.nonJsonObjectError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof rulr_1.Warnings) {
        var code = 400;
        var warnings = err.warnings;
        var strWarnings = warnings.map(function (warning) {
            return translateWarning_1.default(translator, warning);
        });
        var obj = { warnings: strWarnings };
        logError('Validation warnings', strWarnings);
        return sendObject_1.default({ res: res, code: code, errorId: errorId, obj: obj });
    }
    if (err instanceof InvalidMethod_1.default) {
        var code = http_status_codes_1.BAD_REQUEST;
        var message = translator.invalidMethodError(err);
        logError(message);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof ExpiredClientError_1.default) {
        var code = http_status_codes_1.FORBIDDEN;
        var message = translator.expiredClientError(err);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    if (err instanceof UntrustedClientError_1.default) {
        var code = http_status_codes_1.FORBIDDEN;
        var message = translator.untrustedClientError(err);
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    return handleError_1.default({ config: config, errorId: errorId, res: res, err: err });
});
//# sourceMappingURL=handleError.js.map