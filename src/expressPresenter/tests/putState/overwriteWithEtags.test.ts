import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import {
  CLIENT_ERROR_400_HTTP_CODE,
  CONFLICT_409_HTTP_CODE,
  NO_CONTENT_204_HTTP_CODE,
  PRECONDITION_FAILED_412_HTTP_CODE,
} from '../../utils/httpCodes';
import createTextState from '../utils/createTextState';
import setRequestEtags from '../utils/setRequestEtags';
import setup from '../utils/setup';

interface EtagOptions {
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
}

describe('expressPresenter.putState with etags', () => {
  const { service, supertest } = setup();

  const overwriteStateWithEtag = ({ ifMatch, ifNoneMatch }: EtagOptions) => {
    const request = supertest.put('/xAPI/activities/state');
    setRequestEtags(request, ifMatch, ifNoneMatch);
    return request
      .set('Content-Type', TEXT_CONTENT_TYPE)
      .query({
        activityId: TEST_ACTIVITY_ID,
        agent: JSON.stringify(TEST_MBOX_AGENT),
        registration: TEST_REGISTRATION,
        stateId: TEST_STATE_ID,
      })
      .send(TEST_CONTENT);
  };

  it('should allow overwrites when using a correct etag', async () => {
    await createTextState();
    const getStateResult = await service.getState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    const opts = { ifMatch: getStateResult.etag };
    await overwriteStateWithEtag(opts).expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextState();
    const opts = { ifMatch: 'incorrect_etag' };
    await overwriteStateWithEtag(opts).expect(PRECONDITION_FAILED_412_HTTP_CODE);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createTextState();
    const opts = { ifNoneMatch: '*' };
    await overwriteStateWithEtag(opts).expect(PRECONDITION_FAILED_412_HTTP_CODE);
  });

  it('should throw conflict error when not using ifMatch or ifNoneMatch', async () => {
    await createTextState();
    await overwriteStateWithEtag({}).expect(CONFLICT_409_HTTP_CODE);
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createTextState();
    const opts = { ifMatch: 'incorrect_etag', ifNoneMatch: '*' };
    await overwriteStateWithEtag(opts).expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
