import { Response } from 'express';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
import { OK_200_HTTP_CODE } from './httpCodes';
import { xapiHeaderVersion } from '../../utils/constants';

export interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly config: Config;
  readonly registration?: string;
  readonly stateId: string;
  readonly res: Response;
}

export default async ({ config, res, ...opts }: Options) => {
  const getStateResult = await config.service.getState(opts);
  res.status(OK_200_HTTP_CODE);
  res.setHeader('ETag', `"${getStateResult.etag}"`);
  res.setHeader('Last-Modified', getStateResult.updatedAt.toISOString());
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.setHeader('Content-Type', getStateResult.contentType);
  getStateResult.content.pipe(res);
  return;
};
