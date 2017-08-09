import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';
import supertest from '../../utils/supertest';

export default (
  optsOverrides: object = {},
  content: string = TEST_OBJECT_CONTENT,
  contentType: string = JSON_CONTENT_TYPE,
) => {
  return supertest
    .post('/xAPI/activities/state')
    .set('Content-Type', contentType)
    .query({
      activityId: TEST_ACTIVITY_ID,
      agent: JSON.stringify(TEST_MBOX_AGENT),
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
      ...optsOverrides,
    })
    .send(content);
};
