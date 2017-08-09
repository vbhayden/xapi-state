import assertImmutableState from '../../../utils/assertImmutableState';
import assertState from '../../../utils/assertState';
import createImmutableState from '../../../utils/createImmutableState';
import { TEST_CONTENT } from '../../../utils/testValues';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState with existing model', () => {
  setup();

  it('should overwrite model when overwriting an existing model', async () => {
    // Creates model with initial content.
    const initialContent = 'initial_dummy_content';
    await overwriteState({}, initialContent);

    // Overwrites model with expected content.
    await overwriteState();
    await assertState(TEST_CONTENT);
  });

  it('should overwrite model when overwriting without a registration', async () => {
    // Creates model with initial content.
    const initialContent = 'initial_dummy_content';
    await overwriteState({}, initialContent);

    // Overwrites model with expected content.
    await overwriteState({ registration: undefined });
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite non-matched models', async () => {
    await overwriteState();
    await createImmutableState();
    await overwriteState();
    await assertImmutableState();
  });
});
