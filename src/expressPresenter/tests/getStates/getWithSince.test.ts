import { delay } from 'bluebird';
import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';
import supertest from '../utils/supertest';

const TEST_DELAY_MS = 2;

describe('expressPresenter.getStates with since', () => {
  setup();

  const getStates = (timestamp: Date) => {
    return supertest
      .get('/xAPI/activities/state')
      .set('Authorization', 'valid_scope_client')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        since: timestamp.toISOString(),
      });
  };

  it('should return no state ids when updated before since', async () => {
    await createTextState();
    await Promise.resolve(delay(TEST_DELAY_MS));
    const timestamp = new Date();
    await getStates(timestamp).expect(OK_200_HTTP_CODE, []);
  });

  it('should return the state id when updated after since', async () => {
    const timestamp = new Date();
    await Promise.resolve(delay(TEST_DELAY_MS));
    await createTextState();
    await getStates(timestamp).expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });
});
