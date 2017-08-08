import * as assert from 'assert';
import getStates from './getStates';

export default async () => {
  const statesResult = await getStates();
  assert.deepEqual(statesResult.stateIds, []);
};
