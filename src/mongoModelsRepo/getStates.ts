/* tslint:disable:deprecation - find isn't really deprecated */
import { ObjectID } from 'mongodb';
import GetStatesOptions from '../repoFactory/options/GetStatesOptions';
import GetStatesResult from '../repoFactory/results/GetStatesResult';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetStatesOptions): Promise<GetStatesResult> => {
    const collection = (await config.db).collection('states');

    const sinceFilter = (
      opts.since !== undefined
      ? { updatedAt: { $gt: opts.since } }
      : {}
    );
    const filter = {
      activityId: opts.activityId,
      lrs: new ObjectID(opts.client.lrs_id),
      organisation: new ObjectID(opts.client.organisation),
      ...sinceFilter,
    };

    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#find
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/AggregationCursor.html#project
    const documents = await collection.find(filter).project({ stateId: 1 }).toArray();

    // Retrieves the stateId from the documents for the result.
    const stateIds = documents.map((document) => {
      return document.stateId;
    });

    return { stateIds };
  };
};
