import * as stringToStream from 'string-to-stream';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import {
  CLIENT_ERROR_400_HTTP_CODE,
  NO_CONTENT_204_HTTP_CODE,
  PRECONDITION_FAILED_412_HTTP_CODE,
} from '../../utils/httpCodes';
import setRequestEtags from '../utils/setRequestEtags';
import setup from '../utils/setup';

interface EtagOptions {
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
}

describe('expressPresenter.postState with etags', () => {
  const { service, supertest } = setup();

  const createState = async () => {
    await service.overwriteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
  };

  const patchStateWithEtag = ({ ifMatch, ifNoneMatch }: EtagOptions) => {
    const request = supertest.post('/xAPI/activities/state');
    setRequestEtags(request, ifMatch, ifNoneMatch);
    return request
      .set('Content-Type', JSON_CONTENT_TYPE)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send(TEST_OBJECT_CONTENT);
  };

  it('should allow patches when using a correct etag', async () => {
    await createState();
    const getStateResult = await service.getState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    const opts = { ifMatch: getStateResult.etag };
    await patchStateWithEtag(opts).expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createState();
    const opts = { ifMatch: 'incorrect_etag' };
    await patchStateWithEtag(opts).expect(PRECONDITION_FAILED_412_HTTP_CODE);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createState();
    const opts = { ifNoneMatch: '*' };
    await patchStateWithEtag(opts).expect(PRECONDITION_FAILED_412_HTTP_CODE);
  });

  it('should allow patch when not using an ifMatch or ifNoneMatch', async () => {
    await createState();
    await patchStateWithEtag({}).expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createState();
    const opts = { ifMatch: 'incorrect_etag', ifNoneMatch: '*' };
    await patchStateWithEtag(opts).expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
