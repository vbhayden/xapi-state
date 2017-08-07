import commonMongoRepo from 'jscommons/dist/mongoRepo';
import ModelsRepo from '../repoFactory/ModelsRepo';
import Config from './Config';
import deleteState from './deleteState';
import getState from './getState';
import getStates from './getStates';
import overwriteState from './overwriteState';
import patchState from './patchState';

export default (config: Config): ModelsRepo => {
  return {
    deleteState: deleteState(config),
    getState: getState(config),
    getStates: getStates(config),
    overwriteState: overwriteState(config),
    patchState: patchState(config),
    ...commonMongoRepo(config),
  };
};
