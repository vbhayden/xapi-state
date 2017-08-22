/* tslint:disable:no-magic-numbers */
import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getActivityId from './utils/getActivityId';
import getAgent from './utils/getAgent';
import getClient from './utils/getClient';
import getStateFromService from './utils/getStateFromService';
import getStatesFromService from './utils/getStatesFromService';
import validateVersionHeader from './utils/validateVersionHeader';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    validateVersionHeader(req.header('X-Experience-API-Version'));
    const agent = getAgent(req.query.agent);
    const activityId = getActivityId(req.query.activityId);
    const registration = req.query.registration;
    const since = req.query.since;

    if (req.query.stateId === undefined) {
      await getStatesFromService({ config, res, activityId, agent, client, registration, since });
      return;
    } else {
      const stateId = req.query.stateId;
      await getStateFromService({ config, res, activityId, agent, client, registration, stateId });
      return;
    }
  });
};
