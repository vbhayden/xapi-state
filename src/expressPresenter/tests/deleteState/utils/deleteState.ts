import {
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (activityId: string) => {
  const agent = JSON.stringify(TEST_MBOX_AGENT);
  const registration = TEST_REGISTRATION;
  const stateId = TEST_STATE_ID;
  return supertest
    .delete('/xAPI/activities/state')
    .query({ activityId, agent, registration, stateId });
};
