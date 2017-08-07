import service from '../../../../utils/testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default async (content: string, contentType: string, expectedCode: number) => {
  const getStateResult = await service.getState({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
  });
  return supertest
    .post('/xAPI/activities/state')
    .set('Content-Type', contentType)
    .set('If-Match', `"${getStateResult.etag}"`)
    .query({
      activityId: TEST_ACTIVITY_ID,
      agent: JSON.stringify(TEST_MBOX_AGENT),
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    })
    .send(content)
    .expect(expectedCode);
};
