import DeleteStateContentOptions from '../repoFactory/options/DeleteStateContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStateContentOptions): Promise<void> => {
    const profileDir = `${config.subFolder}/state`;
    const filePath = `${profileDir}/${opts.key}`;
    await config.client.deleteObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).promise();
  };
};
