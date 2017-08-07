import { Request } from 'express';
import { isString } from 'lodash';
import * as stringToStream from 'string-to-stream';
import Config from '../Config';
import getActivityId from './getActivityId';
import getAgent from './getAgent';
import getClient from './getClient';
import getContentType from './getContentType';
import getEtag from './getEtag';
import getStateId from './getStateId';

const getContent = (req: Request, contentType: string) => {
  if (contentType === 'application/json') {
    return stringToStream(JSON.stringify(req.body));
  }
  /* istanbul ignore next - superagent always streams content */
  if (isString(req.body)) {
    return stringToStream(req.body);
  }
  return req;
};

export default async (config: Config, req: Request) => {
  const client = await getClient(config, req.header('Authorization'));
  const ifMatch = getEtag(req.header('If-Match'));
  const ifNoneMatch = getEtag(req.header('If-None-Match'));
  const contentType = getContentType(req.header('Content-Type'));
  const agent = getAgent(req.query.agent);
  const stateId = getStateId(req.query.stateId);
  const activityId = getActivityId(req.query.activityId);
  const registration = req.query.registration;
  const content = getContent(req, contentType);

  return {
    activityId,
    agent,
    client,
    content,
    contentType,
    ifMatch,
    ifNoneMatch,
    registration,
    stateId,
  };
};
