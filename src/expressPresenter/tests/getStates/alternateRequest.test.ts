import { route, xapiHeaderVersion } from '../../../utils/constants';
import {
  ALTERNATE_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, OK_200_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter.getStates using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should 400 without version header', async () => {
    await supertest
      .post(route)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .query({ method: 'GET' })
      .send({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
      })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should return no state ids when getting a non-existing activity id', async () => {
    await supertest
      .post(route)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'GET' })
      .send({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
      })
      .expect(OK_200_HTTP_CODE, []);
  });
});
