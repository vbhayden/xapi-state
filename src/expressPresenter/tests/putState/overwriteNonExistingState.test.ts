import assertState from '../../../utils/assertState';
import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState with non-existing model', () => {
  const { supertest } = setup();

  it('should create when using valid activity id', async () => {
    await overwriteState(TEST_ACTIVITY_ID, TEST_CONTENT).expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await overwriteState(
      TEST_INVALID_ACTIVITY_ID,
      TEST_CONTENT,
    ).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the activity id', async () => {
    await supertest
      .put('/xAPI/activities/state')
      .set('Content-Type', TEXT_CONTENT_TYPE)
      .query({
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send(TEST_CONTENT)
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the state id', async () => {
    await supertest
      .put('/xAPI/activities/state')
      .set('Content-Type', TEXT_CONTENT_TYPE)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
      })
      .send(TEST_CONTENT)
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
