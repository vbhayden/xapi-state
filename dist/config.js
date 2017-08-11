"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.config();
var boolean = require("boolean");
var lodash_1 = require("lodash");
var DEFAULT_EXPRESS_PORT = 80;
var DEFAULT_TIMEOUT_MS = 300000; // 5 minutes.
var storageDir = process.cwd() + "/storage";
var expressPort = lodash_1.defaultTo(Number(process.env.EXPRESS_PORT), DEFAULT_EXPRESS_PORT);
var demoAuth = "http://localhost:" + expressPort + "/auth";
var accessLogsDir = storageDir + "/accessLogs";
exports.default = {
    defaultTimeout: lodash_1.defaultTo(Number(process.env.DEFAULT_TIMEOUT_MS), DEFAULT_TIMEOUT_MS),
    express: {
        bodyParserLimit: lodash_1.defaultTo(process.env.EXPRESS_BODY_PARSER_LIMIT, '5mb'),
        customRoute: lodash_1.defaultTo(process.env.EXPRESS_CUSTOM_ROUTE, 'status'),
        customRouteText: lodash_1.defaultTo(process.env.EXPRESS_CUSTOM_ROUTE_TEXT, 'ok'),
        morganDirectory: lodash_1.defaultTo(process.env.EXPRESS_MORGAN_DIRECTORY, accessLogsDir),
        port: expressPort,
    },
    fetchAuthRepo: {
        llClientInfoEndpoint: lodash_1.defaultTo(process.env.LL_CLIENT_INFO_ENDPOINT, demoAuth),
    },
    lang: lodash_1.defaultTo(process.env.LANG, 'en'),
    localStorageRepo: {
        storageDir: lodash_1.defaultTo(process.env.FS_LOCAL_STORAGE_DIR, storageDir),
    },
    mongoModelsRepo: {
        url: lodash_1.defaultTo(process.env.MONGO_URL, 'mongodb://localhost:27017/xapistate'),
    },
    repoFactory: {
        authRepoName: lodash_1.defaultTo(process.env.AUTH_REPO, 'fetch'),
        modelsRepoName: lodash_1.defaultTo(process.env.MODELS_REPO, 'memory'),
        storageRepoName: lodash_1.defaultTo(process.env.STORAGE_REPO, 'local'),
    },
    s3StorageRepo: {
        awsConfig: {
            accessKeyId: lodash_1.defaultTo(String(process.env.FS_S3_ACCESS_KEY_ID), ''),
            apiVersion: '2006-03-01',
            region: lodash_1.defaultTo(String(process.env.FS_S3_REGION), ''),
            secretAccessKey: lodash_1.defaultTo(String(process.env.FS_S3_SECRET_ACCESS_KEY), ''),
            signatureVersion: 'v4',
            sslEnabled: true,
        },
        bucketName: lodash_1.defaultTo(process.env.FS_S3_BUCKET, 'xapi-state'),
        subFolder: lodash_1.defaultTo(process.env.FS_S3_BUCKET_SUBFOLDER, '/storage'),
    },
    winston: {
        cloudWatch: {
            awsConfig: {
                accessKeyId: lodash_1.defaultTo(process.env.WINSTON_CLOUDWATCH_ACCESS_KEY_ID, ''),
                region: lodash_1.defaultTo(process.env.WINSTON_CLOUDWATCH_REGION, ''),
                secretAccessKey: lodash_1.defaultTo(process.env.WINSTON_CLOUDWATCH_SECRET_ACCESS_KEY, ''),
            },
            enabled: lodash_1.defaultTo(boolean(process.env.WINSTON_CLOUDWATCH_ENABLED), false),
            level: lodash_1.defaultTo(process.env.WINSTON_CLOUDWATCH_LEVEL, 'info'),
            logGroupName: lodash_1.defaultTo(process.env.WINSTON_CLOUDWATCH_LOG_GROUP_NAME, 'xapi-state'),
            logStreamName: process.env.WINSTON_CLOUDWATCH_LOG_STREAM_NAME,
        },
        console: {
            level: lodash_1.defaultTo(process.env.WINSTON_CONSOLE_LEVEL, 'info'),
        },
    },
};
//# sourceMappingURL=config.js.map