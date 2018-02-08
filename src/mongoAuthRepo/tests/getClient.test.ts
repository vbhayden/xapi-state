import * as assert from 'assert';
import * as btoa from 'btoa';
import NoModel from 'jscommons/dist/errors/NoModel';
import connectToDb from 'jscommons/dist/mongoRepo/utils/connectToDb';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { ObjectID } from 'mongodb';
import config from '../../config';
import logger from '../../logger';
import mongoAuthRepo from '../../mongoAuthRepo';
import { TEST_CLIENT } from '../../utils/testValues';

const TEST_BASIC_KEY = '123';
const TEST_BASIC_SECRET = 'abc';
const TEST_TOKEN = `Basic ${btoa(`${TEST_BASIC_KEY}:${TEST_BASIC_SECRET}`)}`;

describe('getClient from mongo client', () => {
  const db = connectToDb({
    dbName: config.mongoModelsRepo.dbName,
    logger,
    url: config.mongoModelsRepo.url,
  });
  const authConfig = { db };
  const authRepo = mongoAuthRepo(authConfig);

  it('should get the client when it exists in the DB', async () => {
    const testDocument = {
      ...TEST_CLIENT,
      api: {
        basic_key: TEST_BASIC_KEY,
        basic_secret: TEST_BASIC_SECRET,
      },
      lrs_id: new ObjectID(TEST_CLIENT.lrs_id),
      organisation: new ObjectID(TEST_CLIENT.organisation),
    };
    await (await db()).collection('client').insertOne(testDocument);

    const actualResult = await authRepo.getClient({ authToken: TEST_TOKEN });
    const expectedResult = {
      client: {
        _id: TEST_CLIENT._id,
        isTrusted: TEST_CLIENT.isTrusted,
        lrs_id: TEST_CLIENT.lrs_id,
        organisation: TEST_CLIENT.organisation,
        scopes: TEST_CLIENT.scopes,
      },
    };
    assert.deepEqual(actualResult, expectedResult);
  });

  it('should error when getting without any clients in the DB', async () => {
    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  it('should error when getting a client without an LRS', async () => {
    const testDocument = {
      ...TEST_CLIENT,
      api: {
        basic_key: TEST_BASIC_KEY,
        basic_secret: TEST_BASIC_SECRET,
      },
      lrs_id: undefined,
      organisation: new ObjectID(TEST_CLIENT.organisation),
    };
    await (await db()).collection('client').insertOne(testDocument);

    const promise = authRepo.getClient({ authToken: TEST_TOKEN });
    await assertError(NoModel, promise);
  });

  afterEach(async () => {
    await (await db()).collection('client').deleteMany({});
  });
});
