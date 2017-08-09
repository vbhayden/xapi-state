import assertState from '../../../utils/assertState';
import {
  TEST_CONTENT,
  TEST_INVALID_ACTIVITY_ID,
  TEST_INVALID_AGENT,
  TEST_INVALID_REGISTRATION,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import overwriteState from './utils/overwriteState';

describe('expressPresenter.putState with non-existing model', () => {
  setup();

  it('should create when using valid activity id', async () => {
    await overwriteState().expect(NO_CONTENT_204_HTTP_CODE);
    await assertState(TEST_CONTENT);
  });

  it('should throw warnings when using an invalid activity id', async () => {
    await overwriteState({
      activityId: TEST_INVALID_ACTIVITY_ID,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid agent', async () => {
    await overwriteState({
      agent: JSON.stringify(TEST_INVALID_AGENT),
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when using an invalid registration', async () => {
    await overwriteState({
      registration: TEST_INVALID_REGISTRATION,
    }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the activity id', async () => {
    await overwriteState({ activityId: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the agent', async () => {
    await overwriteState({ agent: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should throw warnings when missing the state id', async () => {
    await overwriteState({ stateId: undefined }).expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
