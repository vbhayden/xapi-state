import * as stringToStream from 'string-to-stream';
import ClientModel from '../../../models/ClientModel';
import assertState from '../../../utils/assertState';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState when outside client', () => {
  const service = setup();

  const overwriteOutsideState = async (client: ClientModel) => {
    await service.overwriteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client,
      content: stringToStream('unused_content'),
      contentType: TEXT_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteState(TEST_ACTIVITY_ID, TEST_CONTENT);
    await overwriteOutsideState(TEST_CLIENT_OUTSIDE_ORG);
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteState(TEST_ACTIVITY_ID, TEST_CONTENT);
    await overwriteOutsideState(TEST_CLIENT_OUTSIDE_STORE);
    await assertState(TEST_CONTENT);
  });
});
