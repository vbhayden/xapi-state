import { OK_200_HTTP_CODE } from '../../../utils/httpCodes';
import getStates from './getStates';

export default async () => {
  await getStates().expect(OK_200_HTTP_CODE, []);
};
