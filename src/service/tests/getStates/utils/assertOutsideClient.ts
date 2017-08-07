import * as assert from 'assert';
import service from '../../../../utils/testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../../utils/testValues';

export default async () => {
  const statesResult = await service.getStates({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
  });
  assert.deepEqual(statesResult.stateIds, []);
};
