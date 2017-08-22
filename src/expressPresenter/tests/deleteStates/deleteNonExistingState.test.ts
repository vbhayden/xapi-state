import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import deleteStates from './utils/deleteStates';

describe('expressPresenter.deleteStates with non-existing state', () => {
  setup();

  it('should not error when deleting', async () => {
    await deleteStates().expect(NO_CONTENT_204_HTTP_CODE);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await deleteStates({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await deleteStates({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await deleteStates({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the activity id', async () => {
    await deleteStates({ activityId: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the agent', async () => {
    await deleteStates({ agent: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
