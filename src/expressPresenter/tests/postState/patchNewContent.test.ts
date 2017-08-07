import assertState from '../../../utils/assertState';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_JSON_CONTENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import createImmutableState from '../utils/createImmutableState';
import setup from '../utils/setup';
import patchContent from './utils/patchContent';

describe('expressPresenter.postState with new content', () => {
  const { supertest } = setup();

  it('should error when patching with text content', async () => {
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should error when patching with JSON content', async () => {
    await patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should create when patching with object content', async () => {
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE).expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should not patch existing models when patching a non-existing model', async () => {
    await createImmutableState();
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE).expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_OBJECT_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await supertest
      .post('/xAPI/activities/state')
      .set('Content-Type', TEXT_CONTENT_TYPE)
      .query({
        activityId: TEST_INVALID_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send(TEST_CONTENT)
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the activity id', async () => {
    await supertest
      .post('/xAPI/activities/state')
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
      .post('/xAPI/activities/state')
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
