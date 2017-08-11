/// <reference types="express" />
import { Response } from 'express';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import Config from '../Config';
export interface Options {
    readonly activityId: string;
    readonly agent: Agent;
    readonly client: ClientModel;
    readonly config: Config;
    readonly registration?: string;
    readonly res: Response;
    readonly since?: string;
}
declare const _default: ({config, res, ...opts}: Options) => Promise<void>;
export default _default;
