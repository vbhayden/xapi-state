import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (
  optsOverrides: object = {},
  content: string = TEST_CONTENT,
  contentType: string = TEXT_CONTENT_TYPE,
) => {
  const activityId = TEST_ACTIVITY_ID;
  const stateId = TEST_STATE_ID;
  const agent = JSON.stringify(TEST_MBOX_AGENT);
  const registration = TEST_REGISTRATION;
  return supertest
    .put('/xAPI/activities/state')
    .set('Content-Type', contentType)
    .query({
      activityId,
      agent,
      registration,
      stateId,
      ...optsOverrides,
    })
    .send(content);
};
