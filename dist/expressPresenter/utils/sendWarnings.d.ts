/// <reference types="express" />
import { Response } from 'express';
import { Warning } from 'rulr';
import Translator from '../../translatorFactory/Translator';
export interface Opts {
    readonly res: Response;
    readonly code: number;
    readonly errorId: string;
    readonly warnings: Warning[];
    readonly translator: Translator;
}
declare const _default: ({res, code, errorId, warnings, translator}: Opts) => Response;
export default _default;
