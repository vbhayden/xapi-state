"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var supertest = require("supertest");
var config_1 = require("../../../config");
var logger_1 = require("../../../logger");
var translatorFactory_1 = require("../../../translatorFactory");
var testService_1 = require("../../../utils/testService");
var index_1 = require("../../index");
var app = express();
var translator = translatorFactory_1.default();
var presenter = index_1.default({
    bodyParserLimit: config_1.default.express.bodyParserLimit,
    customRoute: config_1.default.express.customRoute,
    customRouteText: config_1.default.express.customRouteText,
    logger: logger_1.default,
    morganDirectory: config_1.default.express.morganDirectory,
    service: testService_1.default,
    translator: translator,
});
app.use(presenter);
exports.default = supertest(app);
//# sourceMappingURL=supertest.js.map