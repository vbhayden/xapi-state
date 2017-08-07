import assertState from '../../../utils/assertState';
import {
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState when outside client', () => {
  const { supertest } = setup();

  const overwriteOutsideState = async (token: string) => {
    await supertest
      .put('/xAPI/activities/state')
      .set('Authorization', token)
      .set('Content-Type', TEXT_CONTENT_TYPE)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send('unused_content')
      .expect(NO_CONTENT_204_HTTP_CODE);
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await overwriteState(TEST_ACTIVITY_ID, TEST_CONTENT).expect(NO_CONTENT_204_HTTP_CODE);
    await overwriteOutsideState(TEST_OUTSIDE_ORG_TOKEN);
    await assertState(TEST_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await overwriteState(TEST_ACTIVITY_ID, TEST_CONTENT).expect(NO_CONTENT_204_HTTP_CODE);
    await overwriteOutsideState(TEST_OUTSIDE_STORE_TOKEN);
    await assertState(TEST_CONTENT);
  });
});
