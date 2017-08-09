import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import assertDeleted from '../../../utils/assertDeleted';
import createJsonState from '../../../utils/createJsonState';
import createTextState from '../../../utils/createTextState';
import setup from '../utils/setup';
import deleteState from './utils/deleteState';

describe('deleteState with existing state', () => {
  setup();

  it('should delete when deleting text', async () => {
    await createTextState();
    await deleteState();
    await assertDeleted();
  });

  it('should delete when deleting json', async () => {
    await createJsonState();
    await deleteState();
    await assertDeleted();
  });

  it('should delete when deleting without registration', async () => {
    await createTextState();
    await deleteState({
      registration: undefined,
    });
    await assertDeleted();
  });

  it('should error when deleting existing model without a registration with one', async () => {
    await createTextState({ registration: undefined });
    const promise = deleteState();
    await assertError(NoModel, promise);
  });
});
