/// <reference types="node" />
/// <reference types="express" />
import { Request } from 'express';
import Agent from '../../models/Agent';
export interface Result {
    readonly activityId: string;
    readonly agent: Agent;
    readonly content: NodeJS.ReadableStream;
    readonly contentType: string;
    readonly registration: string;
    readonly stateId: string;
}
declare const _default: (req: Request) => Promise<Result>;
export default _default;
