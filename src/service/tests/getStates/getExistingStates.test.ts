import * as assert from 'assert';
import createTextState from '../../../utils/createTextState';
import { TEST_STATE_ID } from '../../../utils/testValues';
import setup from '../utils/setup';
import getStates from './utils/getStates';

describe('getStates with existing model', () => {
  setup();

  it('should return state ids when getting a existing model', async () => {
    await createTextState();
    const statesResult = await getStates();
    assert.deepEqual(statesResult.stateIds, [TEST_STATE_ID]);
  });

  it('should return state ids when not using registration', async () => {
    await createTextState();
    const statesResult = await getStates({
      registration: undefined,
    });
    assert.deepEqual(statesResult.stateIds, [TEST_STATE_ID]);
  });

  it('should return no ids when getting existing model without a registration with one',
    async () => {
      await createTextState({ registration: undefined });
      const statesResult = await getStates();
      assert.deepEqual(statesResult.stateIds, []);
    },
  );
});
