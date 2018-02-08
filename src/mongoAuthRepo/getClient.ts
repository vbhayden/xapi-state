import * as atob from 'atob';
import NoModel from 'jscommons/dist/errors/NoModel';
import { ObjectID } from 'mongodb';
import ClientModel from '../models/ClientModel';
import GetClientOptions from '../repoFactory/options/GetClientOptions';
import GetClientResult from '../repoFactory/results/GetClientResult';
import Config from './Config';

export default (config: Config) => {
  return async ({ authToken }: GetClientOptions): Promise<GetClientResult> => {
    const strippedAuthToken = authToken.replace('Basic ', '');
    const decodedAuthToken = atob(strippedAuthToken);
    const splitAuthToken = decodedAuthToken.split(':');
    const [key, secret] = splitAuthToken;
    const document = await (await config.db()).collection('client').findOne({
      'api.basic_key': key,
      'api.basic_secret': secret,
    });

    const isMissingClient = (
      document === null ||
      document === undefined ||
      !(document.lrs_id instanceof ObjectID)
    );
    if (isMissingClient) {
      throw new NoModel('Client');
    }

    const client: ClientModel = {
      _id: document._id.toString() as string,
      isTrusted: document.isTrusted as boolean,
      lrs_id: document.lrs_id.toString() as string,
      organisation: document.organisation.toString() as string,
      scopes: document.scopes as string[],
    };

    return { client };
  };
};
