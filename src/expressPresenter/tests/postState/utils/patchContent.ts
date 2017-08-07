import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (content: string, contentType: string) => {
  return supertest
    .post('/xAPI/activities/state')
    .set('Content-Type', contentType)
    .query({
      activityId: TEST_ACTIVITY_ID,
      agent: JSON.stringify(TEST_MBOX_AGENT),
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    })
    .send(content);
};
