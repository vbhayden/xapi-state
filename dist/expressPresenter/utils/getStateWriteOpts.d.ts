/// <reference types="node" />
/// <reference types="express" />
import { Request } from 'express';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
export interface Result {
    readonly activityId: string;
    readonly agent: Agent;
    readonly client: ClientModel;
    readonly content: NodeJS.ReadableStream;
    readonly contentType: string;
    readonly registration: string;
    readonly stateId: string;
}
declare const _default: (config: Config, req: Request) => Promise<Result>;
export default _default;
