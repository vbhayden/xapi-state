import * as assert from 'assert';
import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { XAPI_READ } from '../../../utils/scopes';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getStates with scopes', () => {
  const service = setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const scopes = ['invalid_scope'];
    const promise = service.getStates({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      registration: TEST_REGISTRATION,
    });
    await assertError(Forbidden, promise);
  });

  it('should return no models when using valid scopes', async () => {
    const scopes = [XAPI_READ];
    const getStatesResult = await service.getStates({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      registration: TEST_REGISTRATION,
    });
    assert.deepEqual(getStatesResult.stateIds, []);
  });
});
