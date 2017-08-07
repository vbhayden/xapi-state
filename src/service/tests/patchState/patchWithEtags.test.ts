import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import IfMatch from '../../../errors/IfMatch';
import IfNoneMatch from '../../../errors/IfNoneMatch';
import MaxEtags from '../../../errors/MaxEtags';
import {
  JSON_CONTENT_TYPE,
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_OBJECT_CONTENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import setup from '../utils/setup';

interface EtagOptions {
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
}

describe('patchState with etags', () => {
  const service = setup();

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

  const patchStateWithEtag = async ({ ifMatch, ifNoneMatch }: EtagOptions) => {
    await service.patchState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_OBJECT_CONTENT),
      contentType: JSON_CONTENT_TYPE,
      ifMatch,
      ifNoneMatch,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
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
    await patchStateWithEtag({ ifMatch: getStateResult.etag });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createState();
    const promise = patchStateWithEtag({ ifMatch: 'incorrect_etag' });
    await assertError(IfMatch, promise);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createState();
    const promise = patchStateWithEtag({ ifNoneMatch: '*' });
    await assertError(IfNoneMatch, promise);
  });

  it('should allow patch when not using an ifMatch or ifNoneMatch', async () => {
    await createState();
    await patchStateWithEtag({});
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createState();
    const promise = patchStateWithEtag({ ifMatch: 'incorrect_etag', ifNoneMatch: '*' });
    await assertError(MaxEtags, promise);
  });
});
