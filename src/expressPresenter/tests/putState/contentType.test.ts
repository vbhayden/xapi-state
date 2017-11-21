import assertState from '../../../utils/assertState';
import { route, xapiHeaderVersion } from '../../../utils/constants';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

// These are regression tests for LearningLocker/learninglocker#999.
describe(__filename, () => {
  const { supertest } = setup();

  it('should not error when using a charset for JSON ', async () => {
    await supertest
      .put(route)
      .set('Content-Type', `${JSON_CONTENT_TYPE}; charset=UTF-8`)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send(TEST_OBJECT_CONTENT)
      .expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_OBJECT_CONTENT);
  });
});
