import { NOT_FOUND_404_HTTP_CODE } from '../../../utils/httpCodes';
import getState from './getState';

export default async () => {
  await getState().expect(NOT_FOUND_404_HTTP_CODE);
};
