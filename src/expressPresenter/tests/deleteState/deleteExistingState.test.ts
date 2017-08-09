import { NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import createJsonState from '../utils/createJsonState';
import createTextState from '../utils/createTextState';
import setup from '../utils/setup';
import assertDeleted from './utils/assertDeleted';
import deleteState from './utils/deleteState';

describe('expressPresenter.deleteState with existing state', () => {
  setup();

  it('should delete when deleting text', async () => {
    await createTextState();
    await deleteState().expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted();
  });

  it('should delete when deleting json', async () => {
    await createJsonState();
    await deleteState().expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted();
  });

  it('should delete when not using registration', async () => {
    await createTextState();
    await deleteState({
      registration: undefined,
    }).expect(NO_CONTENT_204_HTTP_CODE);
    await assertDeleted();
  });
});
