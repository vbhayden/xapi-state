"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var connectToDb_1 = require("jscommons/dist/mongoRepo/utils/connectToDb");
var lodash_1 = require("lodash");
var config_1 = require("../../config");
var logger_1 = require("../../logger");
exports.default = lodash_1.once(function () {
    return connectToDb_1.default({
        dbName: config_1.default.mongoModelsRepo.dbName,
        logger: logger_1.default,
        url: config_1.default.mongoModelsRepo.url,
    });
});
//# sourceMappingURL=connectToMongoDb.js.map