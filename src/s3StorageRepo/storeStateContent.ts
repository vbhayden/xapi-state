import StoreStateContentOptions from '../repoFactory/options/StoreStateContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: StoreStateContentOptions): Promise<void> => {
    const profileDir = `${config.subFolder}/state`;
    const filePath = `${profileDir}/${opts.key}`;
    await config.client.upload({
      Body: opts.content,
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
  };
};
