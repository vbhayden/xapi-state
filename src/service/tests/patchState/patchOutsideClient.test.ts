import * as stringToStream from 'string-to-stream';
import ClientModel from '../../../models/ClientModel';
import assertState from '../../../utils/assertState';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';

describe('patchState when outside client', () => {
  const service = setup();

  const patchOutsideState = async (client: ClientModel) => {
    await service.patchState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client,
      content: stringToStream('{"bar":2}'),
      contentType: JSON_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideState(TEST_CLIENT_OUTSIDE_ORG);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideState(TEST_CLIENT_OUTSIDE_STORE);
    await assertState(TEST_OBJECT_CONTENT);
  });
});
