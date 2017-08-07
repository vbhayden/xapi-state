import * as assert from 'assert';
import { delay } from 'bluebird';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';

const TEST_DELAY_MS = 2;

describe('getStates with since', () => {
  const service = setup();

  const getStates = async (timestamp: Date) => {
    return service.getStates({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      since: timestamp.toISOString(),
    });
  };

  it('should return no state ids when updated before since', async () => {
    await createTextState();
    await Promise.resolve(delay(TEST_DELAY_MS));
    const timestamp = new Date();
    const getStatesResult = await getStates(timestamp);
    assert.deepEqual(getStatesResult.stateIds, []);
  });

  it('should return the state id when updated after since', async () => {
    const timestamp = new Date();
    await Promise.resolve(delay(TEST_DELAY_MS));
    await createTextState();
    const getStatesResult = await getStates(timestamp);
    assert.deepEqual(getStatesResult.stateIds, [TEST_STATE_ID]);
  });
});
