import { Request } from 'express';
import * as stringToStream from 'string-to-stream';
import Agent from '../../models/Agent';
import getActivityId from './getActivityId';
import getAgent from './getAgent';
import getContentType from './getContentType';
import getStateId from './getStateId';

export interface Result {
  readonly activityId: string;
  readonly agent: Agent;
  readonly content: NodeJS.ReadableStream;
  readonly contentType: string;
  readonly registration: string;
  readonly stateId: string;
}

export default async (req: Request): Promise<Result> => {
  const contentType = getContentType(req.body['Content-Type']);
  const agent = getAgent(req.body.agent);
  const stateId = getStateId(req.body.stateId);
  const activityId = getActivityId(req.body.activityId);
  const registration = req.body.registration;
  const content = stringToStream(req.body.content);

  return {
    activityId,
    agent,
    content,
    contentType,
    registration,
    stateId,
  };
};
