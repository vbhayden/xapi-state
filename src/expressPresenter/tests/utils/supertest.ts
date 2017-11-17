import * as express from 'express';
import * as supertest from 'supertest';
import config from '../../../config';
import logger from '../../../logger';
import tracker from '../../../tracker';
import translatorFactory from '../../../translatorFactory';
import service from '../../../utils/testService';
import presenterFacade from '../../index';

const app = express();
const translator = translatorFactory();
const presenter = presenterFacade({
  bodyParserLimit: config.express.bodyParserLimit,
  customRoute: config.express.customRoute,
  customRouteText: config.express.customRouteText,
  logger,
  morganDirectory: config.express.morganDirectory,
  service,
  tracker,
  translator,
});

app.use(presenter);

export default supertest(app);
