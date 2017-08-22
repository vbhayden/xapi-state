import { Response } from 'express';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import { OK_200_HTTP_CODE } from './httpCodes';

export interface Options {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly config: Config;
  readonly registration?: string;
  readonly res: Response;
  readonly since?: string;
}

export default async ({ config, res, ...opts }: Options) => {
  const getStatesResult = await config.service.getStates(opts);
  res.status(OK_200_HTTP_CODE);
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  res.json(getStatesResult.stateIds);
  return;
};
