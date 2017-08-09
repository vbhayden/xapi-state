import assertState from '../../../utils/assertState';
import { TEST_CONTENT } from '../../../utils/testValues';
import createImmutableState from '../utils/createImmutableState';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('overwriteState replacing states', () => {
  setup();

  it('should overwrite model when overwriting an existing model', async () => {
    // Creates model with initial content.
    const initialContent = 'initial_dummy_content';
    await overwriteState({}, initialContent);

    // Overwrites model with expected content.
    await overwriteState();
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite existing models when using a non-existing model', async () => {
    await createImmutableState();
    await overwriteState();
    await assertState(TEST_CONTENT);
  });
});
