import * as streamToString from 'stream-to-string';
import OverwriteStateOptions from '../serviceFactory/options/OverwriteStateOptions';
import { jsonContentType } from '../utils/constants';
import getFileExtension from '../utils/getFileExtension';
import parseJSON from '../utils/parseJSON';
import Config from './Config';
import checkStateWriteScopes from './utils/checkStateWriteScopes';
import createEtag from './utils/createEtag';
import validateActivityId from './utils/validateActivityId';
import validateAgent from './utils/validateAgent';
import validateRegistration from './utils/validateRegistration';

export default (config: Config) => {
  return async (opts: OverwriteStateOptions) => {
    checkStateWriteScopes(opts.client.scopes);
    validateActivityId(opts.activityId);
    validateAgent(opts.agent);
    validateRegistration(opts.registration);

    // Update or create State.
    const etag = createEtag();
    const jsonContent = (
      opts.contentType === jsonContentType
        ? parseJSON(await streamToString(opts.content), ['body'])
        : undefined
    );

    const extension = getFileExtension(opts.contentType);

    const overwriteStateResult = await config.repo.overwriteState({
      activityId: opts.activityId,
      agent: opts.agent,
      client: opts.client,
      content: jsonContent,
      contentType: opts.contentType,
      etag,
      extension,
      registration: opts.registration,
      stateId: opts.stateId,
    });

    if (opts.contentType !== jsonContentType) {
      await config.repo.storeStateContent({
        content: opts.content,
        contentType: opts.contentType,
        key: `${overwriteStateResult.id}.${extension}`,
        lrs_id: opts.client.lrs_id,
      });
    }

    return;
  };
};
