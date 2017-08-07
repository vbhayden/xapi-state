import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_INVALID_SCOPE_TOKEN,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEST_VALID_SCOPE_TOKEN,
} from '../../../utils/testValues';
import { FORBIDDEN_403_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.postState with scopes', () => {
  const { supertest } = setup();

  const patchStateWithScopes = (token: string) => {
    return supertest
      .put('/xAPI/activities/state')
      .set('Authorization', token)
      .set('Content-Type', TEST_OBJECT_CONTENT)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send(JSON_CONTENT_TYPE);
  };

  it('should throw forbidden error when using invalid scope', async () => {
    await patchStateWithScopes(TEST_INVALID_SCOPE_TOKEN).expect(FORBIDDEN_403_HTTP_CODE);
  });

  it('should not throw an error when using valid scopes', async () => {
    await patchStateWithScopes(TEST_VALID_SCOPE_TOKEN).expect(NO_CONTENT_204_HTTP_CODE);
  });
});
