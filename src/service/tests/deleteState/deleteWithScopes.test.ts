import Forbidden from 'jscommons/dist/errors/Forbidden';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { XAPI_STATE_ALL } from '../../../utils/scopes';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('deleteState with scopes', () => {
  const service = setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const scopes = ['invalid_scope'];
    const promise = service.deleteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertError(Forbidden, promise);
  });

  it('should throw no model error when using valid scopes', async () => {
    const scopes = [XAPI_STATE_ALL];
    const promise = service.deleteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: { ...TEST_CLIENT, scopes },
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertError(NoModel, promise);
  });
});
