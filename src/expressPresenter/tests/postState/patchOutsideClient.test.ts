import assertState from '../../../utils/assertState';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';

describe('expressPresenter.postState when outside client', () => {
  const { supertest } = setup();

  const patchOutsideState = async (token: string) => {
    await supertest
      .post('/xAPI/activities/state')
      .set('Authorization', token)
      .set('Content-Type', JSON_CONTENT_TYPE)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send('{"bar":2}')
      .expect(NO_CONTENT_204_HTTP_CODE);
  };

  it('should not overwrite existing model when using a different organisation', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideState(TEST_OUTSIDE_ORG_TOKEN);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should not overwrite existing model when using a different store', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await patchOutsideState(TEST_OUTSIDE_STORE_TOKEN);
    await assertState(TEST_OBJECT_CONTENT);
  });
});
