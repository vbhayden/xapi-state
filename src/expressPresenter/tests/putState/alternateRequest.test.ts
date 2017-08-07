import assertState from '../../../utils/assertState';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.putState using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should create when using valid activity id', async () => {
    await supertest
      .post('/xAPI/activities/state')
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({
        method: 'PUT',
      })
      .send({
        'Content-Type': TEXT_CONTENT_TYPE,
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        content: TEST_CONTENT,
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_CONTENT);
  });
});
