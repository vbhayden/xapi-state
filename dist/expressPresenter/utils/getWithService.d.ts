import { Response } from 'express';
import Config from '../Config';
export interface Options {
    readonly query: any;
    readonly headers: any;
    readonly config: Config;
    readonly res: Response;
}
declare const _default: ({ config, query, res, headers }: Options) => Promise<void>;
export default _default;
