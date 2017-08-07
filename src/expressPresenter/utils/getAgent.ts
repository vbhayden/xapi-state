import { createRequiredWarning, Warnings } from 'rulr';
import Agent from '../../models/Agent';

export default (agentParam: string|undefined): Agent => {
  if (agentParam === undefined) {
    const warnings = [createRequiredWarning(agentParam, ['query', 'agent'])];
    throw new Warnings({}, ['query'], warnings);
  }

  return JSON.parse(agentParam) as Agent;
};
