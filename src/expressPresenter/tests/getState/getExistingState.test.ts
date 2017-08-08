import { TEST_CONTENT, TEST_JSON_CONTENT } from '../../../utils/testValues';
import { OK_200_HTTP_CODE } from '../../utils/httpCodes';
import createJsonState from '../utils/createJsonState';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';
import getState from './utils/getState';

describe('expressPresenter.getState with existing state', () => {
  setup();

  it('should get when getting text', async () => {
    await createTextState();
    await getState().expect(OK_200_HTTP_CODE, TEST_CONTENT);
  });

  it('should get when getting json', async () => {
    await createJsonState();
    await getState().expect(OK_200_HTTP_CODE, JSON.parse(TEST_JSON_CONTENT));
  });
});
