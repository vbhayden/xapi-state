import * as fs from 'fs-extra';
import DeleteStatesContentOptions from '../repoFactory/options/DeleteStatesContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStatesContentOptions): Promise<void> => {
    const stateDir = `${config.storageDir}/states`;
    await Promise.all(opts.keys.map((key) => {
      const filePath = `${stateDir}/${key}`;
      return fs.unlink(filePath);
    }));
  };
};
