import {
  ALTERNATE_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';

describe('expressPresenter.getState using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should get when getting text', async () => {
    await createTextState();
    await supertest
      .post('/xAPI/activities/state')
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({ method: 'GET' })
      .send({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(OK_200_HTTP_CODE, TEST_CONTENT);
  });
});
