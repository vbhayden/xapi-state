import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_INVALID_SCOPE_TOKEN,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEST_VALID_SCOPE_TOKEN,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import { FORBIDDEN_403_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.putState with scopes', () => {
  const { supertest } = setup();

  const overwriteStateWithScopes = (token: string) => {
    return supertest
      .put('/xAPI/activities/state')
      .set('Authorization', token)
      .set('Content-Type', TEXT_CONTENT_TYPE)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send(TEST_CONTENT);
  };

  it('should throw forbidden error when using invalid scope', async () => {
    await overwriteStateWithScopes(TEST_INVALID_SCOPE_TOKEN).expect(FORBIDDEN_403_HTTP_CODE);
  });

  it('should not throw an error when using valid scopes', async () => {
    await overwriteStateWithScopes(TEST_VALID_SCOPE_TOKEN).expect(NO_CONTENT_204_HTTP_CODE);
  });
});
