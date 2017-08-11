import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import getTestStates from '../../../../utils/getTestStates';

export default async () => {
  const promise = getTestStates();
  await assertError(NoModel, promise);
};
