import GetStateContentOptions from '../repoFactory/options/GetStateContentOptions';
import GetStateContentResult from '../repoFactory/results/GetStateContentResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStateContentOptions): Promise<GetStateContentResult> => {
    const profileDir = `${config.subFolder}/state`;
    const filePath = `${profileDir}/${opts.key}`;
    const content = config.client.getObject({
      Bucket: config.bucketName,
      Key: filePath,
    }).createReadStream();
    return { content };
  };
};
