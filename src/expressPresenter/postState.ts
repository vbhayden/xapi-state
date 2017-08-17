import { Request, Response } from 'express';
import Config from './Config';
import alternateStateRequest from './utils/alternateStateRequest';
import catchErrors from './utils/catchErrors';
import getStateWriteOpts from './utils/getStateWriteOpts';
import { NO_CONTENT_204_HTTP_CODE } from './utils/httpCodes';
import { xapiHeaderVersion } from '../utils/constants';

export default (config: Config) => {
  return catchErrors(config, async (req: Request, res: Response): Promise<void> => {
    const method = req.query.method;

    if (method !== undefined) {
      return alternateStateRequest({ config, method, req, res });
    }

    const opts = await getStateWriteOpts(config, req);
    await config.service.patchState(opts);
    res.status(NO_CONTENT_204_HTTP_CODE);
    res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
    res.send();
  });
};
