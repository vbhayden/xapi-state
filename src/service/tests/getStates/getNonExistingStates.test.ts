import * as assert from 'assert';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_TIMESTAMP,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';

describe('getStates with non-existing agent', () => {
  const service = setup();

  it('should return no state ids when getting a non-existing activity id', async () => {
    const statesResult = await service.getStates({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
    });
    assert.deepEqual(statesResult.stateIds, []);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = service.getStates({
      activityId: TEST_INVALID_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
    });
    await assertError(Warnings, promise);
  });

    it('should throw warnings when using an invalid since', async () => {
      const promise = service.getStates({
        activityId: TEST_INVALID_ACTIVITY_ID,
        agent: TEST_MBOX_AGENT,
        client: TEST_CLIENT,
        registration: TEST_REGISTRATION,
        since: TEST_INVALID_TIMESTAMP,
      });
      await assertError(Warnings, promise);
    });
});
