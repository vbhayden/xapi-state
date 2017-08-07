import {
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (activityId: string, content: string) => {
  const stateId = TEST_STATE_ID;
  const agent = JSON.stringify(TEST_MBOX_AGENT);
  const registration = TEST_REGISTRATION;
  return supertest
    .put('/xAPI/activities/state')
    .set('Content-Type', TEXT_CONTENT_TYPE)
    .query({ activityId, agent, stateId, registration })
    .send(content);
};
