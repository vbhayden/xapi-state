import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import { TEST_ACTIVITY_ID, TEST_INVALID_ACTIVITY_ID } from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('deleteState with non-existing state', () => {
  setup();

  it('should error when deleting', async () => {
    const promise = deleteState(TEST_ACTIVITY_ID);
    await assertError(NoModel, promise);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = deleteState(TEST_INVALID_ACTIVITY_ID);
    await assertError(Warnings, promise);
  });
});
