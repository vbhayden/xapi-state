import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import { XAPI_STATE_ALL } from '../../../utils/scopes';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('patchState with scopes', () => {
  const service = setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const scopes = ['invalid_scope'];
    const promise = service.patchState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertError(Forbidden, promise);
  });

  it('should not throw an error when using valid scopes', async () => {
    const scopes = [XAPI_STATE_ALL];
    await service.patchState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
  });
});
