import * as fs from 'fs-extra';
import StoreStateContentOptions from '../repoFactory/options/StoreStateContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreStateContentOptions): Promise<void> => {
    const stateDir = `${config.storageDir}/states`;
    await fs.ensureDir(stateDir);
    await new Promise<void>((resolve, reject) => {
      const filePath = `${stateDir}/${opts.key}`;
      const writeStream = fs.createWriteStream(filePath);
      opts.content.pipe(writeStream);
      opts.content.on('end', () => {
        resolve();
      });
      opts.content.on('error', (err: any) => {
        /* istanbul ignore next */
        reject(err);
      });
    });
  };
};
