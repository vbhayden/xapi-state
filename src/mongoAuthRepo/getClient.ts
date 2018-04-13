import * as atob from 'atob';
import NoModel from 'jscommons/dist/errors/NoModel';
import ExpiredClientError from '../errors/ExpiredClientError';
import UntrustedClientError from '../errors/UntrustedClientError';
import ClientModel from '../models/ClientModel';
import GetClientOptions from '../repoFactory/options/GetClientOptions';
import GetClientResult from '../repoFactory/results/GetClientResult';
import Config from './Config';

export default (config: Config) => {
  return async ({ authToken }: GetClientOptions): Promise<GetClientResult> => {
    const db = await config.db();
    const strippedAuthToken = authToken.replace('Basic ', '');
    const decodedAuthToken = atob(strippedAuthToken);
    const splitAuthToken = decodedAuthToken.split(':');
    const [key, secret] = splitAuthToken;
    const clientDoc = await db.collection('client').findOne({
      'api.basic_key': key,
      'api.basic_secret': secret,
    });

    if (clientDoc === null || clientDoc === undefined) {
      throw new NoModel('Client');
    }

    if (clientDoc.isTrusted === false) {
      throw new UntrustedClientError();
    }

    const [orgDoc, lrsDoc] = await Promise.all([
      db.collection('organisations').findOne({
        _id: clientDoc.organisation,
      }),
      db.collection('lrs').findOne({
        _id: clientDoc.lrs_id,
      }),
    ]);

    if (orgDoc === null || orgDoc === undefined || lrsDoc === null || lrsDoc === undefined) {
      throw new NoModel('Client');
    }

    if (orgDoc.expiration !== null && orgDoc.expiration < new Date()) {
      throw new ExpiredClientError();
    }

    const client: ClientModel = {
      _id: clientDoc._id.toString() as string,
      isTrusted: clientDoc.isTrusted as boolean,
      lrs_id: clientDoc.lrs_id.toString() as string,
      organisation: clientDoc.organisation.toString() as string,
      scopes: clientDoc.scopes as string[],
    };

    return { client };
  };
};
