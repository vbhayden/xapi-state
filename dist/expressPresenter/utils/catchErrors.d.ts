import { Request, Response } from 'express';
import CommonHandler from 'jscommons/dist/expressPresenter/utils/Handler';
import Config from '../Config';
declare const _default: (config: Config, handler: CommonHandler) => (req: Request, res: Response) => void;
export default _default;
