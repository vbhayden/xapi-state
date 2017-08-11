import { Request } from 'express';
import { isString } from 'lodash';
import * as stringToStream from 'string-to-stream';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
import getActivityId from './getActivityId';
import getAgent from './getAgent';
import getClient from './getClient';
import getContentType from './getContentType';
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

export interface Result {
  readonly activityId: string;
  readonly agent: Agent;
  readonly client: ClientModel;
  readonly content: NodeJS.ReadableStream;
  readonly contentType: string;
  readonly registration: string;
  readonly stateId: string;
}

export default async (config: Config, req: Request): Promise<Result> => {
  const client = await getClient(config, req.header('Authorization'));
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
    registration,
    stateId,
  };
};
