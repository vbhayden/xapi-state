import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getState with non-existing model', () => {
  const service = setup();

  it('should error when getting a non-existing model', async () => {
    const promise = service.getState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertError(NoModel, promise);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = service.getState({
      activityId: TEST_INVALID_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertError(Warnings, promise);
  });
});
