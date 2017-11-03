/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import { defaultTo } from 'lodash';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidMethod from '../../errors/InvalidMethod';
import { xapiHeaderVersion } from '../../utils/constants';
import Config from '../Config';
import { alternateContentTypePattern } from './contentTypePatterns';
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

const getHeader = (req: Request, name: string): string => {
  return defaultTo(req.body[name], defaultTo<string>(req.header(name), ''));
};

export default async ({ config, method, req, res }: Options) => {
  const contentType = req.header('Content-Type');
  if (contentType === undefined || !alternateContentTypePattern.test(contentType)) {
    throw new InvalidContentType(contentType);
  }

  switch (method) {
    case 'POST': {
      const client = await getClient(config, getHeader(req, 'Authorization'));
      const opts = await getAlternateStateWriteOpts(req);
      validateVersionHeader(getHeader(req, 'X-Experience-API-Version'));
      await config.service.patchState({ client, ...opts });
      res.status(204).setHeader('X-Experience-API-Version', xapiHeaderVersion);
      res.send();
      return;
    }
    case 'GET': {
      const client = await getClient(config, getHeader(req, 'Authorization'));
      validateVersionHeader(getHeader(req, 'X-Experience-API-Version'));
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
      const client = await getClient(config, getHeader(req, 'Authorization'));
      const opts = await getAlternateStateWriteOpts(req);
      validateVersionHeader(getHeader(req, 'X-Experience-API-Version'));
      await config.service.overwriteState({ client, ...opts });
      res.status(204).setHeader('X-Experience-API-Version', xapiHeaderVersion);
      res.send();
      return;
    }
    case 'DELETE': {
      const client = await getClient(config, getHeader(req, 'Authorization'));
      validateVersionHeader(getHeader(req, 'X-Experience-API-Version'));
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
