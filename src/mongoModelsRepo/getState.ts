import NoModel from 'jscommons/dist/errors/NoModel';
import { defaultTo } from 'lodash';
import { ObjectID } from 'mongodb';
import GetStateOptions from '../repoFactory/options/GetStateOptions';
import GetStateResult from '../repoFactory/results/GetStateResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStateOptions): Promise<GetStateResult> => {
    const collection = (await config.db).collection('states');

    const filter = {
      activityId: opts.activityId,
      lrs: new ObjectID(opts.client.lrs_id),
      organisation: new ObjectID(opts.client.organisation),
      stateId: opts.stateId,
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOne
    const document = await collection.findOne(filter);

    if (document === null || document === undefined) {
      /* istanbul ignore next */
      throw new NoModel('State');
    }

    return {
      content: defaultTo<any>(document.content, undefined),
      contentType: document.contentType,
      etag: document.etag,
      id: document._id.toString(),
      updatedAt: document.updatedAt,
    };
  };
};
