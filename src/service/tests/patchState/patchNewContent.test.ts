import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import * as stringToStream from 'string-to-stream';
import NonJsonObject from '../../../errors/NonJsonObject';
import assertState from '../../../utils/assertState';
import {
  JSON_CONTENT_TYPE,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import createImmutableState from '../utils/createImmutableState';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';

describe('patchState with new content', () => {
  const service = setup();

  it('should error when patching with text content', async () => {
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should create when patching with object content', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should not patch existing models when patching a non-existing model', async () => {
    await createImmutableState();
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = service.patchState({
      activityId: TEST_INVALID_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertError(Warnings, promise);
  });
});
