import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import {
  FORBIDDEN_403_HTTP_CODE,
  NOT_FOUND_404_HTTP_CODE,
} from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.deleteState with scopes', () => {
  const { supertest } = setup();

  it('should throw forbidden error when using invalid scope', async () => {
    await supertest
      .delete('/xAPI/activities/state')
      .set('Authorization', 'invalid_scope_client')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(FORBIDDEN_403_HTTP_CODE);
  });

  it('should throw no model error when using valid scopes', async () => {
    await supertest
      .delete('/xAPI/activities/state')
      .set('Authorization', 'valid_scope_client')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(NOT_FOUND_404_HTTP_CODE);
  });
});
