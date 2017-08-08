import Forbidden from 'jscommons/dist/errors/Forbidden';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { XAPI_STATE_ALL } from '../../../utils/scopes';
import { TEST_CLIENT } from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('deleteState with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    const scopes = ['invalid_scope'];
    const promise = deleteState({
      client: { ...TEST_CLIENT, scopes },
    });
    await assertError(Forbidden, promise);
  });

  it('should throw no model error when using valid scopes', async () => {
    const scopes = [XAPI_STATE_ALL];
    const promise = deleteState({
      client: { ...TEST_CLIENT, scopes },
    });
    await assertError(NoModel, promise);
  });
});
