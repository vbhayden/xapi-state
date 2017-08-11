/// <reference types="express" />
import { Response } from 'express';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import Translator from '../../translatorFactory/Translator';
export interface Options extends CommonOptions {
    readonly translator: Translator;
}
declare const _default: ({translator, errorId, res, err}: Options) => Response;
export default _default;
