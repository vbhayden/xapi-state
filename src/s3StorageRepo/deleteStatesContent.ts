import * as S3 from 'aws-sdk/clients/s3';
import DeleteStatesContentOptions from '../repoFactory/options/DeleteStatesContentOptions';
import Config from './Config';

export default (config: Config) => {
  return async (opts: DeleteStatesContentOptions): Promise<void> => {
    const profileDir = `${config.subFolder}/state`;

    if (opts.keys.length === 0 ) {
      return;
    }
    const identifierList: S3.ObjectIdentifierList = opts.keys.map((key) => {
      return { Key: `${profileDir}/${key}` };
    });

    await config.client.deleteObjects({
      Bucket: config.bucketName,
      Delete: { Objects: identifierList },
    }).promise();
  };
};
