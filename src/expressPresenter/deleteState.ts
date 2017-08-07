import { Request, Response } from 'express';
import Config from './Config';
import catchErrors from './utils/catchErrors';
import getActivityId from './utils/getActivityId';
import getAgent from './utils/getAgent';
import getClient from './utils/getClient';
import getEtag from './utils/getEtag';
import getStateId from './utils/getStateId';
import { NO_CONTENT_204_HTTP_CODE } from './utils/httpCodes';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const client = await getClient(config, req.header('Authorization'));
    const ifMatch = getEtag(req.header('If-Match'));
    const stateId = getStateId(req.query.stateId);
    const activityId = getActivityId(req.query.activityId);
    const agent = getAgent(req.query.agent);
    const registration = req.query.registration;

    await config.service.deleteState({ activityId, agent, client, ifMatch, registration, stateId });
    res.status(NO_CONTENT_204_HTTP_CODE);
    res.setHeader('X-Experience-API-Version', '1.0.0');
    res.send();
  });
};
