import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';
import supertest from '../utils/supertest';
import getStates from './utils/getStates';

describe('expressPresenter.getStates with existing model', () => {
  setup();

  it('should return state ids when getting a existing model', async () => {
    await createTextState();
    await getStates().expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });

  it('should return state ids when not using registration', async () => {
    await createTextState();
    await getStates({ registration: undefined }).expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });

  it('should return state ids when not using registration', async () => {
    await createTextState();
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
      })
      .expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });
});
