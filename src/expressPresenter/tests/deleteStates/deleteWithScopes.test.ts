import {
  FORBIDDEN_403_HTTP_CODE,
  NO_CONTENT_204_HTTP_CODE,
} from '../../utils/httpCodes';
import setup from '../utils/setup';
import deleteStates from './utils/deleteStates';

describe('expressPresenter.deleteStates with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    await deleteStates()
      .set('Authorization', 'invalid_scope_client')
      .expect(FORBIDDEN_403_HTTP_CODE);
  });

  it('should not throw error when using valid scopes', async () => {
    await deleteStates()
      .set('Authorization', 'valid_scope_client')
      .expect(NO_CONTENT_204_HTTP_CODE);
  });
});
