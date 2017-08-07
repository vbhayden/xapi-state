import commonFsRepo from 'jscommons/dist/fsRepo';
import StorageRepo from '../repoFactory/StorageRepo';
import Config from './Config';
import deleteStateContent from './deleteStateContent';
import getStateContent from './getStateContent';
import storeStateContent from './storeStateContent';

export default (config: Config): StorageRepo => {
  return {
    deleteStateContent: deleteStateContent(config),
    getStateContent: getStateContent(config),
    storeStateContent: storeStateContent(config),
    ...commonFsRepo(config),
  };
};
