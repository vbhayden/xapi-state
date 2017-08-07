import * as fs from 'fs-extra';
import DeleteStateContentOptions from '../repoFactory/options/DeleteStateContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStateContentOptions): Promise<void> => {
    const stateDir = `${config.storageDir}/states`;
    const filePath = `${stateDir}/${opts.key}`;
    await fs.unlink(filePath);
  };
};
