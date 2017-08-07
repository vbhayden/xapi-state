import * as stringToStream from 'string-to-stream';
import assertState from '../../../utils/assertState';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import createImmutableState from '../utils/createImmutableState';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState replacing states', () => {
  const service = setup();

  it('should overwrite model when overwriting an existing model', async () => {
    // Creates model with initial content.
    const initialContent = 'initial_dummy_content';
    await overwriteState(TEST_ACTIVITY_ID, initialContent);

    // Overwrites model with expected content.
    const getStateResult = await service.getState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      stateId: TEST_STATE_ID,
    });
    await service.overwriteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      ifMatch: getStateResult.etag,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite existing models when using a non-existing model', async () => {
    await createImmutableState();
    await overwriteState(TEST_ACTIVITY_ID, TEST_CONTENT);
    await assertState(TEST_CONTENT);
  });
});
