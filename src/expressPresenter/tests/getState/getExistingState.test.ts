import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { TEST_CONTENT, TEST_JSON_CONTENT } from '../../../utils/testValues';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createJsonState from '../utils/createJsonState';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';

describe('expressPresenter.getState with existing state', () => {
  const { supertest } = setup();

  it('should get when getting text', async () => {
    await createTextState();
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(OK_200_HTTP_CODE, TEST_CONTENT);
  });

  it('should get when getting json', async () => {
    await createJsonState();
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(OK_200_HTTP_CODE, JSON.parse(TEST_JSON_CONTENT));
  });
});
