import assertError from 'jscommons/dist/tests/utils/assertError';
import IfMatch from '../../../errors/IfMatch';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';

describe('deleteState with etags', () => {
  const service = setup();

  it('should allow deletion when using a correct etag', async () => {
    await createTextState();
    const getStateResult = await service.getState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await service.deleteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      ifMatch: getStateResult.etag,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
  });

  it('should throw precondition error when using an incorrect ifMatch', async () => {
    await createTextState();
    const promise = service.deleteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      ifMatch: 'incorrect_etag',
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
    await assertError(IfMatch, promise);
  });

  it('should allow deletion when not using an IfMatch', async () => {
    await createTextState();
    await service.deleteState({
      activityId: TEST_ACTIVITY_ID,
      agent: TEST_MBOX_AGENT,
      client: TEST_CLIENT,
      registration: TEST_REGISTRATION,
      stateId: TEST_STATE_ID,
    });
  });
});
