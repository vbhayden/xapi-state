import { Router } from 'express';
import mixinCors from 'jscommons/dist/expressPresenter/mixins/cors';
import mixinHelmet from 'jscommons/dist/expressPresenter/mixins/helmet';
import mixinMorgan from 'jscommons/dist/expressPresenter/mixins/morgan';
import mixinUrlEncoding from 'jscommons/dist/expressPresenter/mixins/urlEncoding';
import Config from './Config';
import deleteState from './deleteState';
import getStates from './getStates';
import postState from './postState';
import putState from './putState';

export default (config: Config): Router => {
  const router = Router();

  router.use(mixinCors());
  router.use(mixinUrlEncoding(config.bodyParserLimit));
  router.use(mixinHelmet());
  router.use(mixinMorgan(config.morganDirectory));

  router.delete('', deleteState(config));
  router.get('', getStates(config));
  router.put('', putState(config));
  router.post('', postState(config));

  return router;
};
