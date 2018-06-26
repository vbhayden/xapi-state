"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setupService_1 = require("jscommons/dist/tests/utils/setupService");
var testService_1 = require("../../../utils/testService");
var supertest_1 = require("./supertest");
var setup = setupService_1.default(testService_1.default);
exports.default = (function () {
    setup();
    return { service: testService_1.default, supertest: supertest_1.default };
});
//# sourceMappingURL=setup.js.map