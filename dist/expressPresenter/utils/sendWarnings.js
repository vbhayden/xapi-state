"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sendObject_1 = require("jscommons/dist/expressPresenter/utils/sendObject");
var translateWarning_1 = require("./translateWarning");
exports.default = function (_a) {
    var res = _a.res, code = _a.code, errorId = _a.errorId, warnings = _a.warnings, translator = _a.translator;
    var strWarnings = warnings.map(function (warning) {
        return translateWarning_1.default(translator, warning);
    });
    var obj = { warnings: strWarnings };
    return sendObject_1.default({ res: res, code: code, errorId: errorId, obj: obj });
};
//# sourceMappingURL=sendWarnings.js.map