/// <reference types="node" />
import { Response } from 'express';
import Config from '../Config';
export interface Options {
    readonly query: any;
    readonly headers: any;
    readonly content: NodeJS.ReadableStream;
    readonly config: Config;
    readonly res: Response;
}
declare const _default: ({ config, res, query, headers, content }: Options) => Promise<void>;
export default _default;
