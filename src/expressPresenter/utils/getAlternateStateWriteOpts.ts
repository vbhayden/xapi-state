import { Request } from 'express';
import * as stringToStream from 'string-to-stream';
import Config from '../Config';
import getActivityId from './getActivityId';
import getAgent from './getAgent';
import getClient from './getClient';
import getContentType from './getContentType';
import getStateId from './getStateId';

export default async (config: Config, req: Request) => {
  const client = await getClient(config, req.body.Authorization);
  const contentType = getContentType(req.body['Content-Type']);
  const agent = getAgent(req.body.agent);
  const stateId = getStateId(req.body.stateId);
  const activityId = getActivityId(req.body.activityId);
  const registration = req.body.registration;
  const content = stringToStream(req.body.content);

  return {
    activityId,
    agent,
    client,
    content,
    contentType,
    registration,
    stateId,
  };
};
