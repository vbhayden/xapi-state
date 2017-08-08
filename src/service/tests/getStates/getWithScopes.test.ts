import * as assert from 'assert';
import Forbidden from 'jscommons/dist/errors/Forbidden';
import assertError from 'jscommons/dist/tests/utils/assertError';
import {
  TEST_INVALID_SCOPE_CLIENT,
  TEST_VALID_SCOPE_CLIENT,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getStates from './utils/getStates';

describe('getStates with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const promise = getStates({
      client: TEST_INVALID_SCOPE_CLIENT,
    });
    await assertError(Forbidden, promise);
  });

  it('should return no models when using valid scopes', async () => {
    const getStatesResult = await getStates({
      client: TEST_VALID_SCOPE_CLIENT,
    });
    assert.deepEqual(getStatesResult.stateIds, []);
  });
});
