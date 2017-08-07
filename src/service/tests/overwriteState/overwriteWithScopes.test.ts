import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import { XAPI_STATE_ALL } from '../../../utils/scopes';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('overwriteState with scopes', () => {
  const service = setup();

  const overwriteStateWithScopes = (scopes: string[]) => {
    return service.overwriteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
  };

  it('should throw forbidden error when using invalid scope', async () => {
    const scopes = ['invalid_scope'];
    const promise = overwriteStateWithScopes(scopes);
    await assertError(Forbidden, promise);
  });

  it('should not throw an error when using valid scopes', async () => {
    const scopes = [XAPI_STATE_ALL];
    await overwriteStateWithScopes(scopes);
  });
});
