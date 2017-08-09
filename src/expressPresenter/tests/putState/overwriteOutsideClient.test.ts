import assertState from '../../../utils/assertState';
import {
  TEST_CONTENT,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState when outside client', () => {
  setup();

  const overwriteOutsideState = async (token: string) => {
    await overwriteState()
      .set('Authorization', token)
      .send('unused_content')
      .expect(NO_CONTENT_204_HTTP_CODE);
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteState().expect(NO_CONTENT_204_HTTP_CODE);
    await overwriteOutsideState(TEST_OUTSIDE_ORG_TOKEN);
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteState().expect(NO_CONTENT_204_HTTP_CODE);
    await overwriteOutsideState(TEST_OUTSIDE_STORE_TOKEN);
    await assertState(TEST_CONTENT);
  });
});
