import * as streamToString from 'stream-to-string';
import OverwriteStateOptions from '../serviceFactory/options/OverwriteStateOptions';
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
      opts.contentType === 'application/json'
      ? JSON.parse(await streamToString(opts.content))
      : undefined
    );
    const overwriteStateResult = await config.repo.overwriteState({
      activityId: opts.activityId,
      agent: opts.agent,
      client: opts.client,
      content: jsonContent,
      contentType: opts.contentType,
      etag,
      registration: opts.registration,
      stateId: opts.stateId,
    });

    if (opts.contentType !== 'application/json') {
      await config.repo.storeStateContent({
        content: opts.content,
        key: overwriteStateResult.id,
      });
    }

    return;
  };
};
