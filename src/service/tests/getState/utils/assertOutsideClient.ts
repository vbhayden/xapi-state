import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import getState from './getState';

export default async () => {
  const promise = getState();
  await assertError(NoModel, promise);
};
