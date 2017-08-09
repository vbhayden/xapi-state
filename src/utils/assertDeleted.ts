import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import getTestState from './getTestState';
import getTestStates from './getTestStates';

export default async () => {
  // Asserts that the agent has no states.
  const getStatesResult = await getTestStates();
  assert.deepEqual([], getStatesResult.stateIds);

  // Asserts that the state does not exist.
  const getStatePromise = getTestState();
  await assertError(NoModel, getStatePromise);
};
