import {
  TEST_ACTIVITY_ID,
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
  TEST_INVALID_TIMESTAMP,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, OK_200_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import supertest from '../utils/supertest';
import getStates from './utils/getStates';

describe('expressPresenter.getStates with non-existing agent', () => {
  setup();

  it('should return no state ids when getting a non-existing activity id', async () => {
    await getStates().expect(OK_200_HTTP_CODE, []);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await getStates({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await getStates({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await getStates({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid since', async () => {
    await getStates({
      since: TEST_INVALID_TIMESTAMP,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the activity id', async () => {
    await supertest
      .get('/xAPI/activities/state')
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
      })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the agent', async () => {
    await supertest
      .get('/xAPI/activities/state')
      .query({
        activityId: TEST_ACTIVITY_ID,
        registration: TEST_REGISTRATION,
      })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
