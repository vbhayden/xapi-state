"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleError_1 = require("jscommons/dist/expressPresenter/utils/handleError");
var sendMessage_1 = require("jscommons/dist/expressPresenter/utils/sendMessage");
var lodash_1 = require("lodash");
var rulr_1 = require("rulr");
var InvalidContentType_1 = require("../../errors/InvalidContentType");
var InvalidMethod_1 = require("../../errors/InvalidMethod");
var NonJsonObject_1 = require("../../errors/NonJsonObject");
var constants_1 = require("../../utils/constants");
var httpCodes_1 = require("./httpCodes");
var sendWarnings_1 = require("./sendWarnings");
exports.default = function (_a) {
    var translator = _a.translator, errorId = _a.errorId, res = _a.res, err = _a.err;
    res.setHeader('X-Experience-API-Version', constants_1.xapiHeaderVersion);
    /* istanbul ignore next - all server errors expected during tests are caught */
    if (lodash_1.isNull(err) || lodash_1.isUndefined(null)) {
        var code = httpCodes_1.SERVER_ERROR_500_HTTP_CODE;
        var message = translator.serverError();
        return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
    }
    switch (err.constructor) {
        case InvalidContentType_1.default: {
            var code = httpCodes_1.CLIENT_ERROR_400_HTTP_CODE;
            var message = translator.invalidContentTypeError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case NonJsonObject_1.default: {
            var code = httpCodes_1.CLIENT_ERROR_400_HTTP_CODE;
            var message = translator.nonJsonObjectError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        case rulr_1.Warnings: {
            var code = httpCodes_1.CLIENT_ERROR_400_HTTP_CODE;
            var warnings = err.warnings;
            return sendWarnings_1.default({ res: res, code: code, errorId: errorId, warnings: warnings, translator: translator });
        }
        case InvalidMethod_1.default: {
            var code = httpCodes_1.CLIENT_ERROR_400_HTTP_CODE;
            var message = translator.invalidMethodError(err);
            return sendMessage_1.default({ res: res, code: code, errorId: errorId, message: message });
        }
        default: {
            return handleError_1.default({ translator: translator, errorId: errorId, res: res, err: err });
        }
    }
};
//# sourceMappingURL=handleError.js.map