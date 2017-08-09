import assertDeleted from '../../../utils/assertDeleted';
import createTextState from '../../../utils/createTextState';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.deleteState using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should delete when deleting text', async () => {
    await createTextState();
    await supertest
      .post('/xAPI/activities/state')
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({ method: 'DELETE' })
      .send({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted();
  });
});
