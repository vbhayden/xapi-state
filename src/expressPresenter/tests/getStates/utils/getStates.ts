import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (optsOverrides: object = {}) => {
  const activityId = TEST_ACTIVITY_ID;
  const agent = JSON.stringify(TEST_MBOX_AGENT);
  const registration = TEST_REGISTRATION;
  return supertest
    .get('/xAPI/activities/state')
    .query({
      activityId,
      agent,
      registration,
      ...optsOverrides,
    });
};
