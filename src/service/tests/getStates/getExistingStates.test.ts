import * as assert from 'assert';
import createTextState from '../../../utils/createTextState';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEST_STATE_ID,
} from '../../../utils/testValues';
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

  it('should return state ids when using an mbox', async () => {
    await createTextState({ agent: TEST_MBOX_AGENT });
    const statesResult = await getStates({ agent: TEST_MBOX_AGENT });
    assert.deepEqual(statesResult.stateIds, [TEST_STATE_ID]);
  });

  it('should return state ids when using an mbox_sha1sum', async () => {
    await createTextState({ agent: TEST_MBOXSHA1_AGENT });
    const statesResult = await getStates({ agent: TEST_MBOXSHA1_AGENT });
    assert.deepEqual(statesResult.stateIds, [TEST_STATE_ID]);
  });

  it('should return state ids when using an openid', async () => {
    await createTextState({ agent: TEST_OPENID_AGENT });
    const statesResult = await getStates({ agent: TEST_OPENID_AGENT });
    assert.deepEqual(statesResult.stateIds, [TEST_STATE_ID]);
  });

  it('should return state ids when using an account', async () => {
    await createTextState({ agent: TEST_ACCOUNT_AGENT });
    const statesResult = await getStates({ agent: TEST_ACCOUNT_AGENT });
    assert.deepEqual(statesResult.stateIds, [TEST_STATE_ID]);
  });
});
