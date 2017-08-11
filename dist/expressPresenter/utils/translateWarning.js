"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var translateWarning_1 = require("jscommons/dist/expressPresenter/utils/translateWarning");
var TypeWarning_1 = require("xapi-validation/dist/warnings/TypeWarning");
exports.default = function (translator, warning) {
    switch (warning.constructor) {
        case TypeWarning_1.default:
            return translator.xapiTypeWarning(warning);
        default:
            return translateWarning_1.default(translator, warning);
    }
};
//# sourceMappingURL=translateWarning.js.map