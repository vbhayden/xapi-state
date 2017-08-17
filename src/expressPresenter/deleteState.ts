import { Request, Response } from 'express';
import { xapiHeaderVersion } from '../utils/constants';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getActivityId from './utils/getActivityId';
import getAgent from './utils/getAgent';
import getClient from './utils/getClient';
import getStateId from './utils/getStateId';
import { NO_CONTENT_204_HTTP_CODE } from './utils/httpCodes';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    const stateId = getStateId(req.query.stateId);
    const activityId = getActivityId(req.query.activityId);
    const agent = getAgent(req.query.agent);
    const registration = req.query.registration;

    await config.service.deleteState({ activityId, agent, client, registration, stateId });
    res.status(NO_CONTENT_204_HTTP_CODE);
    res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
    res.send();
  });
};
