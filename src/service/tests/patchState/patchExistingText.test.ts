import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import NonJsonObject from '../../../errors/NonJsonObject';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';
import patchExistingContent from './utils/patchExistingContent';

describe('patchState with existing text content', () => {
  const service = setup();

  const createTextContent = async () => {
    await service.overwriteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
  };

  it('should error when patching with text content', async () => {
    await createTextContent();
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    await createTextContent();
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with object content', async () => {
    await createTextContent();
    const promise = patchExistingContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });
});
