import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import deleteState from './deleteState';

export default async () => {
  const promise = deleteState();
  await assertError(NoModel, promise);
};
