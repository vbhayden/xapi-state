import ClientModel from '../../../../models/ClientModel';
import assertState from '../../../../utils/assertState';
import { NO_CONTENT_204_HTTP_CODE } from '../../../utils/httpCodes';
import deleteState from './deleteState';

export default async (client: ClientModel, content: string) => {
  await deleteState().expect(NO_CONTENT_204_HTTP_CODE);
  await assertState(content, { client });
};
