import {
  TEST_ACTIVITY_ID,
  TEST_INVALID_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NOT_FOUND_404_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.getState with non-existing model', () => {
  const { supertest } = setup();

  it('should error when getting a non-existing model', async () => {
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(NOT_FOUND_404_HTTP_CODE);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_INVALID_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  // Could have tested that 400s are returned when missing activity ID and state ID.
  // However, when missing state ID, the express presenter will use getStates.
  // The missing actvitiy ID case is covered in the getStates tests.
});
