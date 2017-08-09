import createTextState from '../../../utils/createTextState';
import { TEST_STATE_ID } from '../../../utils/testValues';
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
});
