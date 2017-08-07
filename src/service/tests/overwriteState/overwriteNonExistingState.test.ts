import assertError from 'jscommons/dist/tests/utils/assertError';
import { Warnings } from 'rulr';
import assertState from '../../../utils/assertState';
import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState with non-existing model', () => {
  setup();

  it('should create when using valid activity id', async () => {
    await overwriteState(TEST_ACTIVITY_ID, TEST_CONTENT);
    await assertState(TEST_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    const promise = overwriteState(TEST_INVALID_ACTIVITY_ID, TEST_CONTENT);
    await assertError(Warnings, promise);
  });
});
