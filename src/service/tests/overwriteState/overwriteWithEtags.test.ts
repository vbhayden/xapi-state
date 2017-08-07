import assertError from 'jscommons/dist/tests/utils/assertError';
import * as stringToStream from 'string-to-stream';
import Conflict from '../../../errors/Conflict';
import IfMatch from '../../../errors/IfMatch';
import IfNoneMatch from '../../../errors/IfNoneMatch';
import MaxEtags from '../../../errors/MaxEtags';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';

interface EtagOptions {
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
}

describe('overwriteState with etags', () => {
  const service = setup();

  const overwriteStateWithEtag = async ({ ifMatch, ifNoneMatch }: EtagOptions) => {
    await service.overwriteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      content: stringToStream(TEST_CONTENT),
      contentType: TEXT_CONTENT_TYPE,
      ifMatch,
      ifNoneMatch,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
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
    await overwriteStateWithEtag({ ifMatch: getStateResult.etag });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextState();
    const promise = overwriteStateWithEtag({ ifMatch: 'incorrect_etag' });
    await assertError(IfMatch, promise);
  });

  it('should throw precondition error when using an incorrect ifNoneMatch', async () => {
    await createTextState();
    const promise = overwriteStateWithEtag({ ifNoneMatch: '*' });
    await assertError(IfNoneMatch, promise);
  });

  it('should throw conflict error when not using ifMatch or ifNoneMatch', async () => {
    await createTextState();
    const promise = overwriteStateWithEtag({});
    await assertError(Conflict, promise);
  });

  it('should throw max etag error when using ifMatch and ifNoneMatch', async () => {
    await createTextState();
    const promise = overwriteStateWithEtag({ ifMatch: 'incorrect_etag', ifNoneMatch: '*' });
    await assertError(MaxEtags, promise);
  });
});
