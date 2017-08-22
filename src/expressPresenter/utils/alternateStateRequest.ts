/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidMethod from '../../errors/InvalidMethod';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import getActivityId from './getActivityId';
import getAgent from './getAgent';
import getAlternateStateWriteOpts from './getAlternateStateWriteOpts';
import getClient from './getClient';
import getStateFromService from './getStateFromService';
import getStatesFromService from './getStatesFromService';
import validateVersionHeader from './validateVersionHeader';

export interface Options {
  readonly config: Config;
  readonly method: string;
  readonly req: Request;
  readonly res: Response;
}

export default async ({ config, method, req, res }: Options) => {
  if (req.header('Content-Type') !== 'application/x-www-form-urlencoded') {
    throw new InvalidContentType(req.header('Content-Type'));
  }

  switch (method) {
    case 'POST': {
      const opts = await getAlternateStateWriteOpts(config, req);
      validateVersionHeader(req.header('X-Experience-API-Version'));
      await config.service.patchState(opts);
      res.status(204).setHeader('X-Experience-API-Version', xapiHeaderVersion);
      res.send();
      return;
    }
    case 'GET': {
      const client = await getClient(config, req.body.Authorization);
      validateVersionHeader(req.header('X-Experience-API-Version'));
      const agent = getAgent(req.body.agent);
      const activityId = getActivityId(req.body.activityId);
      const registration = req.body.registration;

      if (req.body.stateId === undefined) {
        await getStatesFromService({ config, res, activityId, agent, client, registration });
        return;
      } else {
        const stateId = req.body.stateId;
        await getStateFromService({
          activityId,
          agent,
          client,
          config,
          registration,
          res,
          stateId,
        });
        return;
      }
    }
    case 'PUT': {
      const opts = await getAlternateStateWriteOpts(config, req);
      validateVersionHeader(req.header('X-Experience-API-Version'));
      await config.service.overwriteState(opts);
      res.status(204).setHeader('X-Experience-API-Version', xapiHeaderVersion);
      res.send();
      return;
    }
    case 'DELETE': {
      const client = await getClient(config, req.body.Authorization);
      validateVersionHeader(req.header('X-Experience-API-Version'));
      const agent = getAgent(req.body.agent);
      const stateId = req.body.stateId;
      const activityId = getActivityId(req.body.activityId);

      if (stateId === undefined) {
        await config.service.deleteStates({ activityId, agent, client });
      } else {
        await config.service.deleteState({ activityId, agent, client, stateId });
      }
      res.status(204).setHeader('X-Experience-API-Version', xapiHeaderVersion);
      res.send();
      return;
    }
    default: {
      throw new InvalidMethod(method);
    }
  }
};
