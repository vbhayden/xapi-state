import {
  TEST_INVALID_SCOPE_TOKEN,
  TEST_VALID_SCOPE_TOKEN,
} from '../../../utils/testValues';
import { FORBIDDEN_403_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    await overwriteState()
      .set('Authorization', TEST_INVALID_SCOPE_TOKEN)
      .expect(FORBIDDEN_403_HTTP_CODE);
  });

  it('should not throw an error when using valid scopes', async () => {
    await overwriteState()
      .set('Authorization', TEST_VALID_SCOPE_TOKEN)
      .expect(NO_CONTENT_204_HTTP_CODE);
  });
});
