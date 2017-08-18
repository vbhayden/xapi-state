import * as assert from 'assert';
import * as btoa from 'btoa';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { MongoClient } from 'mongodb';
import config from '../../config';
import mongoAuthRepo from '../../mongoAuthRepo';
import { TEST_CLIENT } from '../../utils/testValues';

const TEST_BASIC_KEY = '123';
const TEST_BASIC_SECRET = 'abc';
const TEST_TOKEN = `Basic ${btoa(`${TEST_BASIC_KEY}:${TEST_BASIC_SECRET}`)}`;

describe('getClient from mongo client', () => {
  const db = MongoClient.connect(config.mongoModelsRepo.url);
  const authConfig = { db };
  const authRepo = mongoAuthRepo(authConfig);

  it('should get the client when it exists in the DB', async () => {
    const testDocument = {
      ...TEST_CLIENT,
      api: {
        basic_key: TEST_BASIC_KEY,
        basic_secret: TEST_BASIC_SECRET,
      },
    };
    await (await db).collection('client').insertOne(testDocument);

    const result = await authRepo.getClient({ authToken: TEST_TOKEN });
    assert.equal(result.client.isTrusted, TEST_CLIENT.isTrusted);
    assert.equal(result.client.lrs_id, TEST_CLIENT.lrs_id);
    assert.equal(result.client.organisation, TEST_CLIENT.organisation);
    assert.deepEqual(result.client.scopes, TEST_CLIENT.scopes);
  });

  it('should error when getting without any clients in the DB', async () => {
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  afterEach( async () => {
    await (await db).collection('client').deleteMany({});
  });
});
