import { Response } from 'express';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import Config from '../Config';
export interface Options extends CommonOptions {
    readonly config: Config;
}
declare const _default: ({ config, errorId, res, err }: Options) => Response;
export default _default;
