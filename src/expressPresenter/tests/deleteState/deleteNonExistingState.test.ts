import {
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NOT_FOUND_404_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('expressPresenter.deleteState with non-existing state', () => {
  setup();

  it('should error when deleting', async () => {
    await deleteState().expect(NOT_FOUND_404_HTTP_CODE);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await deleteState({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await deleteState({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await deleteState({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the activity id', async () => {
    await deleteState({ activityId: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the state id', async () => {
    await deleteState({ stateId: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the agent', async () => {
    await deleteState({ agent: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
