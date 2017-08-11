/// <reference types="express" />
import { Request, Response } from 'express';
import Config from './Config';
declare const _default: (config: Config) => (req: Request, res: Response) => void;
export default _default;
