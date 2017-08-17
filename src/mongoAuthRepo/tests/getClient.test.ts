import * as assert from 'assert';
import * as btoa from 'btoa';
import { MongoClient } from 'mongodb';
import config from '../../config';
import mongoAuthRepo from '../../mongoAuthRepo';
import { TEST_CLIENT } from '../../utils/testValues';

describe('getClient from mongo client', () => {
  const authConfig = {
    db: MongoClient.connect(config.mongoModelsRepo.url),
  };
  const authRepo = mongoAuthRepo(authConfig);

  it('should return a client from the db', async () => {
    const basicKey = '123';
    const basicSecret = 'abc';
    await (await authConfig.db).collection('client').insertOne({
      ...TEST_CLIENT,
      api: {
        basic_key: basicKey,
        basic_secret: basicSecret,
      },
    });

    const b64 = btoa(`${basicKey}:${basicSecret}`);
    const authToken = `Basic ${b64}`;
    const result = await authRepo.getClient({ authToken });

    assert.equal(result.client.isTrusted, TEST_CLIENT.isTrusted);
    assert.equal(result.client.lrs_id, TEST_CLIENT.lrs_id);
    assert.equal(result.client.organisation, TEST_CLIENT.organisation);
    assert.deepEqual(result.client.scopes, TEST_CLIENT.scopes);
  });

  afterEach( async () => {
    await (await authConfig.db).collection('client').deleteMany({});
  });
});
