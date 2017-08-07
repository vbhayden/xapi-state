import commonService from 'jscommons/dist/service';
import Service from '../serviceFactory/Service';
import Config from './Config';
import deleteState from './deleteState';
import getClient from './getClient';
import getState from './getState';
import getStates from './getStates';
import overwriteState from './overwriteState';
import patchState from './patchState';

export default (config: Config): Service => {
  return {
    deleteState: deleteState(config),
    getClient: getClient(config),
    getState: getState(config),
    getStates: getStates(config),
    overwriteState: overwriteState(config),
    patchState: patchState(config),

    ...commonService(config),
  };
};
