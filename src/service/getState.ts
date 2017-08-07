import * as stringToStream from 'string-to-stream';
import GetStateOptions from '../serviceFactory/options/GetStateOptions';
import GetStateResult from '../serviceFactory/results/GetStateResult';
import Config from './Config';
import checkStateReadScopes from './utils/checkStateReadScopes';
import validateActivityId from './utils/validateActivityId';

export default (config: Config) => {
  return async (opts: GetStateOptions): Promise<GetStateResult> => {
    checkStateReadScopes(opts.client.scopes);
    validateActivityId(opts.activityId);
    const state = await config.repo.getState({
      activityId: opts.activityId,
      agent: opts.agent,
      client: opts.client,
      registration: opts.registration,
      stateId: opts.stateId,
    });

    if (state.content !== undefined) {
      return {
        content: stringToStream(JSON.stringify(state.content)),
        contentType: state.contentType,
        etag: state.etag,
        updatedAt: state.updatedAt,
      };
    }

    const stateContentResult = await config.repo.getStateContent({
      key: state.id,
    });
    return {
      content: stateContentResult.content,
      contentType: state.contentType,
      etag: state.etag,
      updatedAt: state.updatedAt,
    };
  };
};
