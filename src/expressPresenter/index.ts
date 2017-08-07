import { Router } from 'express';
import commonExpressPresenter from 'jscommons/dist/expressPresenter';
import Config from './Config';
import deleteState from './deleteState';
import getStates from './getStates';
import postState from './postState';
import putState from './putState';

export default (config: Config): Router => {
  const router = commonExpressPresenter(config);
  router.delete('/xAPI/activities/state', deleteState(config));
  router.get('/xAPI/activities/state', getStates(config));
  router.put('/xAPI/activities/state', putState(config));
  router.post('/xAPI/activities/state', postState(config));
  return router;
};
