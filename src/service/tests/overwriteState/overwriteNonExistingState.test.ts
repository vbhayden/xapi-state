import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import assertState from '../../../utils/assertState';
import {
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState with non-existing model', () => {
  setup();

  it('should create when using valid activity id', async () => {
    await overwriteState();
    await assertState(TEST_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = overwriteState({ activityId: TEST_INVALID_ACTIVITY_ID });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid agent', async () => {
    const promise = overwriteState({ agent: TEST_INVALID_AGENT });
    await assertError(Warnings, promise);
  });

  it('should throw warnings when using an invalid registration', async () => {
    const promise = overwriteState({ registration: TEST_INVALID_REGISTRATION });
    await assertError(Warnings, promise);
  });
});
