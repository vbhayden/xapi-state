import * as fs from 'fs-extra';
import GetStateContentOptions from '../repoFactory/options/GetStateContentOptions';
import GetStateContentResult from '../repoFactory/results/GetStateContentResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStateContentOptions): Promise<GetStateContentResult> => {
    const stateDir = `${config.storageDir}/states`;
    const filePath = `${stateDir}/${opts.key}`;
    const content = fs.createReadStream(filePath);
    return { content };
  };
};
