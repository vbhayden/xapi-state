import createTextState from '../../../utils/createTextState';
import {
  TEST_ACCOUNT_AGENT,
  TEST_MBOX_AGENT,
  TEST_MBOXSHA1_AGENT,
  TEST_OPENID_AGENT,
  TEST_STATE_ID,
} from '../../../utils/testValues';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import getStates from './utils/getStates';

describe('expressPresenter.getStates with existing model', () => {
  setup();

  it('should return state ids when getting a existing model', async () => {
    await createTextState();
    await getStates().expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });

  it('should return state ids when not using registration', async () => {
    await createTextState();
    await getStates({ registration: undefined }).expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });

  it('should return no ids when getting existing model without a registration with one',
    async () => {
      await createTextState({ registration: undefined });
      await getStates().expect(OK_200_HTTP_CODE, []);
    },
  );

  it('should return state ids when using an mbox', async () => {
    await createTextState({ agent: TEST_MBOX_AGENT });
    await getStates({ agent: JSON.stringify(TEST_MBOX_AGENT) })
      .expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });

  it('should return state ids when using an mbox_sha1sum', async () => {
    await createTextState({ agent: TEST_MBOXSHA1_AGENT });
    await getStates({ agent: JSON.stringify(TEST_MBOXSHA1_AGENT) })
      .expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });

  it('should return state ids when using an openid', async () => {
    await createTextState({ agent: TEST_OPENID_AGENT });
    await getStates({ agent: JSON.stringify(TEST_OPENID_AGENT) })
      .expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });

  it('should return state ids when using an account', async () => {
    await createTextState({ agent: TEST_ACCOUNT_AGENT });
    await getStates({ agent: JSON.stringify(TEST_ACCOUNT_AGENT) })
      .expect(OK_200_HTTP_CODE, [TEST_STATE_ID]);
  });
});
