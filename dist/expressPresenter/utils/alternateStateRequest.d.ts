/// <reference types="express" />
import { Request, Response } from 'express';
import Config from '../Config';
export interface Options {
    readonly config: Config;
    readonly method: string;
    readonly req: Request;
    readonly res: Response;
}
declare const _default: ({config, method, req, res}: Options) => Promise<void>;
export default _default;
