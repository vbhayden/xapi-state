import { NOT_FOUND_404_HTTP_CODE } from '../../../utils/httpCodes';
import deleteState from './deleteState';

export default async () => {
  await deleteState().expect(NOT_FOUND_404_HTTP_CODE);
};
