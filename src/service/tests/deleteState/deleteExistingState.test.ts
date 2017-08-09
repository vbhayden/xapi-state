import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import createTextState from '../../../utils/createTextState';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('deleteState with existing state', () => {
  const service = setup();

  const assertDeleted = async () => {
    // Asserts that the agent has no states.
    const getStatesResult = await service.getStates({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
    });
    assert.deepEqual([], getStatesResult.stateIds);

    // Asserts that the state does not exist.
    const getStatePromise = service.getState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertError(NoModel, getStatePromise);
  };

  it('should delete when deleting text', async () => {
    await createTextState();
    await deleteState();
    await assertDeleted();
  });

  it('should delete when deleting json', async () => {
    await service.overwriteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_JSON_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await deleteState();
    await assertDeleted();
  });

  it('should delete when deleting without registration', async () => {
    await createTextState();
    await deleteState({
      registration: undefined,
    });
    await assertDeleted();
  });

  it('should error when deleting existing model without a registration with one', async () => {
    await createTextState({ registration: undefined });
    const promise = deleteState();
    await assertError(NoModel, promise);
  });
});
