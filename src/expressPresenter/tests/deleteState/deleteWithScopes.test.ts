import {
  FORBIDDEN_403_HTTP_CODE,
  NO_CONTENT_204_HTTP_CODE,
} from '../../utils/httpCodes';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('expressPresenter.deleteState with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    await deleteState()
      .set('Authorization', 'invalid_scope_client')
      .expect(FORBIDDEN_403_HTTP_CODE);
  });

  it('should not error when using valid scopes', async () => {
    await deleteState()
      .set('Authorization', 'valid_scope_client')
      .expect(NO_CONTENT_204_HTTP_CODE);
  });
});
