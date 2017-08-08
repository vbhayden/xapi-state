import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('deleteState with non-existing state', () => {
  setup();

  it('should error when deleting', async () => {
    const promise = deleteState();
    await assertError(NoModel, promise);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = deleteState({ activityId: TEST_INVALID_ACTIVITY_ID });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = deleteState({ agent: TEST_INVALID_AGENT });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid registration', async () => {
    const promise = deleteState({ registration: TEST_INVALID_REGISTRATION });
    await assertError(Warnings, promise);
  });
});
