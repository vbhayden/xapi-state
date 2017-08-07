import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_TIMESTAMP,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, OK_200_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import supertest from '../utils/supertest';

describe('expressPresenter.getStates with non-existing agent', () => {
  setup();

  it('should return no state ids when getting a non-existing activity id', async () => {
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
      })
      .expect(OK_200_HTTP_CODE, []);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_INVALID_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
      })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid since', async () => {
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_INVALID_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        since: TEST_INVALID_TIMESTAMP,
      })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the activity id', async () => {
    await supertest
      .get('/xAPI/activities/state')
      .set('Content-Type', TEXT_CONTENT_TYPE)
      .send(TEST_CONTENT)
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
