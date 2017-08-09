import assertImmutableState from '../../../utils/assertImmutableState';
import assertState from '../../../utils/assertState';
import createImmutableState from '../../../utils/createImmutableState';
import { TEST_CONTENT } from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState with existing model', () => {
  setup();

  it('should overwrite model when overwriting an existing model', async () => {
    // Creates model with initial content.
    const initialContent = 'initial_dummy_content';
    await overwriteState({}, initialContent).expect(NO_CONTENT_204_HTTP_CODE);

    // Overwrites model with expected content.
    await overwriteState({}).expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_CONTENT);
  });

  it('should overwrite model when overwriting without a registration', async () => {
    // Creates model with initial content.
    const initialContent = 'initial_dummy_content';
    await overwriteState({}, initialContent).expect(NO_CONTENT_204_HTTP_CODE);

    // Overwrites model with expected content.
    await overwriteState({ registration: undefined }).expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite non-matched models', async () => {
    await overwriteState();
    await createImmutableState();
    await overwriteState();
    await assertImmutableState();
  });
});
