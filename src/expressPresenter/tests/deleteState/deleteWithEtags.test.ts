import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import {
  NO_CONTENT_204_HTTP_CODE,
  PRECONDITION_FAILED_412_HTTP_CODE,
} from '../../utils/httpCodes';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';

describe('expressPresenter.deleteState with etags', () => {
  const { service, supertest } = setup();

  it('should allow deletion when using a correct etag', async () => {
    await createTextState();
    const getStateResult = await service.getState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await supertest
      .delete('/xAPI/activities/state')
      .set('If-Match', `"${getStateResult.etag}"`)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextState();
    await supertest
      .delete('/xAPI/activities/state')
      .set('If-Match', `"incorrect_etag"`)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(PRECONDITION_FAILED_412_HTTP_CODE);
  });

  it('should allow deletion when not using an IfMatch', async () => {
    await createTextState();
    await supertest
      .delete('/xAPI/activities/state')
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .expect(NO_CONTENT_204_HTTP_CODE);
  });
});
