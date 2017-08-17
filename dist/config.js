"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var getBooleanOption_1 = require("jscommons/dist/config/getBooleanOption");
var getNumberOption_1 = require("jscommons/dist/config/getNumberOption");
var getStringOption_1 = require("jscommons/dist/config/getStringOption");
var os = require("os");
var DEFAULT_EXPRESS_PORT = 80;
var DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.
var storageDir = process.cwd() + "/storage";
var expressPort = getNumberOption_1.default(process.env.EXPRESS_PORT, DEFAULT_EXPRESS_PORT);
var demoAuth = "http://localhost:" + expressPort + "/auth";
var accessLogsDir = storageDir + "/accessLogs";
exports.default = {
    defaultTimeout: getNumberOption_1.default(process.env.DEFAULT_TIMEOUT_MS, DEFAULT_TIMEOUT_MS),
    express: {
        bodyParserLimit: getStringOption_1.default(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
        customRoute: getStringOption_1.default(process.env.EXPRESS_CUSTOM_ROUTE, 'status'),
        customRouteText: getStringOption_1.default(process.env.EXPRESS_CUSTOM_ROUTE_TEXT, 'ok'),
        morganDirectory: getStringOption_1.default(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
        port: expressPort,
    },
    fetchAuthRepo: {
        llClientInfoEndpoint: getStringOption_1.default(process.env.LL_CLIENT_INFO_ENDPOINT, demoAuth),
    },
    lang: getStringOption_1.default(process.env.LANG, 'en'),
    localStorageRepo: {
        storageDir: getStringOption_1.default(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
    },
    mongoModelsRepo: {
        url: getStringOption_1.default(process.env.MONGO_URL, 'mongodb://localhost:27017/xapistate'),
    },
    repoFactory: {
        authRepoName: getStringOption_1.default(process.env.AUTH_REPO, 'mongo'),
        modelsRepoName: getStringOption_1.default(process.env.MODELS_REPO, 'memory'),
        storageRepoName: getStringOption_1.default(process.env.STORAGE_REPO, 'local'),
    },
    s3StorageRepo: {
        awsConfig: {
            accessKeyId: getStringOption_1.default(process.env.FS_S3_ACCESS_KEY_ID, ''),
            apiVersion: '2006-03-01',
            region: getStringOption_1.default(process.env.FS_S3_REGION, ''),
            secretAccessKey: getStringOption_1.default(process.env.FS_S3_SECRET_ACCESS_KEY, ''),
            signatureVersion: 'v4',
            sslEnabled: true,
        },
        bucketName: getStringOption_1.default(process.env.FS_S3_BUCKET, 'xapi-state'),
        subFolder: getStringOption_1.default(process.env.FS_S3_BUCKET_SUBFOLDER, '/storage'),
    },
    winston: {
        cloudWatch: {
            awsConfig: {
                accessKeyId: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID, ''),
                region: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_REGION, ''),
                secretAccessKey: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY, ''),
            },
            enabled: getBooleanOption_1.default(process.env.WINSTON_CLOUDWATCH_ENABLED, false),
            level: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
            logGroupName: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-state'),
            logStreamName: getStringOption_1.default(process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME, os.hostname()),
        },
        console: {
            level: getStringOption_1.default(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
        },
    },
};
//# sourceMappingURL=config.js.map