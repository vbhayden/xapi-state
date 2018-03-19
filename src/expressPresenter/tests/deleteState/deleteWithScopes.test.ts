import { FORBIDDEN, NO_CONTENT } from 'http-status-codes';
import {
  TEST_EXPIRED_ORG_TOKEN,
  TEST_INVALID_SCOPE_TOKEN,
  TEST_VALID_SCOPE_TOKEN,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('expressPresenter.deleteState with scopes', () => {
  setup();

  it('should throw forbidden error when using invalid scope', async () => {
    await deleteState()
      .set('Authorization', TEST_INVALID_SCOPE_TOKEN)
      .expect(FORBIDDEN);
  });

  it('should throw forbidden error when using expired client', async () => {
    await deleteState()
      .set('Authorization', TEST_EXPIRED_ORG_TOKEN)
      .expect(FORBIDDEN);
  });

  it('should not error when using valid scopes', async () => {
    await deleteState()
      .set('Authorization', TEST_VALID_SCOPE_TOKEN)
      .expect(NO_CONTENT);
  });
});
