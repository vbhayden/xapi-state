/* tslint:disable:max-file-line-count */
import { isPlainObject } from 'lodash';
import { ObjectID } from 'mongodb';
import Conflict from '../errors/Conflict';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import MaxEtags from '../errors/MaxEtags';
import OverwriteStateOptions from '../repoFactory/options/OverwriteStateOptions';
import OverwriteStateResult from '../repoFactory/results/OverwriteStateResult';
import Config from './Config';

// Within this code, Etags (ifMatch/ifNoneMatch) are used to manage concurrent creates/updates.
// Docs: https://github.com/adlnet/xAPI-Spec/blob/master/xAPI-Communication.md#concurrency

export default (config: Config) => {
  return async (opts: OverwriteStateOptions): Promise<OverwriteStateResult> => {
    const collection = (await config.db).collection('states');
    const checkIfMatch = opts.ifMatch !== undefined;
    const checkIfNoneMatch = opts.ifNoneMatch === '*';
    const checkConflict = opts.ifMatch === undefined && opts.ifNoneMatch === undefined;

    if (checkIfMatch && checkIfNoneMatch) {
      throw new MaxEtags();
    }

    const stateFilter = {
      activityId: opts.activityId,
      lrs: new ObjectID(opts.client.lrs_id),
      organisation: new ObjectID(opts.client.organisation),
      stateId: opts.stateId,
    };

    const update = {
      // Overwrites the content and contentType.
      content: opts.content,
      contentType: opts.contentType,
      etag: opts.etag,
      isObjectContent: isPlainObject(opts.content),

      // Updates updatedAt time.
      updatedAt: new Date(),
    };

    // Attempts to update the state because the ifMatch option is provided.
    if (checkIfMatch) {
      const ifMatchFilter = { etag: opts.ifMatch };

      // Updates the state if it exists with the correct ETag.
      // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
      // Docs: http://bit.ly/findAndModifyWriteOpResult
      const updateOpResult = await collection.findOneAndUpdate({
        ...ifMatchFilter,
        ...stateFilter,
      }, {
        $set: update,
      }, {
        returnOriginal: false, // Ensures the updated document is returned.
        upsert: false, // Does not create the state when it doesn't exist.
      });

      // Determines if the State was updated.
      // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
      const updatedDocuments = updateOpResult.lastErrorObject.n as number;
      if (updatedDocuments === 1) {
        return {
          id: updateOpResult.value._id.toString(),
        };
      }
    }

    // Creates the state if it doesn't already exist.
    // Docs: http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#findOneAndUpdate
    // Docs: http://bit.ly/findAndModifyWriteOpResult
    const createOpResult = await collection.findOneAndUpdate(stateFilter, {
      $setOnInsert: update,
    }, {
      returnOriginal: false, // Ensures the updated document is returned.
      upsert: true, // Creates the state when it's not found.
    });

    // Determines if the State was created or found.
    // Docs: https://docs.mongodb.com/manual/reference/command/getLastError/#getLastError.n
    const wasCreated = createOpResult.lastErrorObject.upserted !== undefined;

    // Throws the IfMatch error when the state already exists.
    // This is because there must have been an ETag mismatch in the previous update.
    if (!wasCreated && checkIfMatch) {
      throw new IfMatch();
    }

    if (!wasCreated && checkIfNoneMatch) {
      throw new IfNoneMatch();
    }

    if (!wasCreated && checkConflict) {
      throw new Conflict();
    }

    return {
      id: createOpResult.value._id.toString(),
    };
  };
};
