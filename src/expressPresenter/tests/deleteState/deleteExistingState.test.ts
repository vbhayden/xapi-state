import assertDeleted from '../../../utils/assertDeleted';
import createJsonState from '../../../utils/createJsonState';
import createTextState from '../../../utils/createTextState';
import { NO_CONTENT_204_HTTP_CODE, NOT_FOUND_404_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
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

  it('should error when deleting existing model without a registration with one', async () => {
    await createTextState({ registration: undefined });
    await deleteState().expect(NOT_FOUND_404_HTTP_CODE);
  });
});
