import DeleteStateOptions from '../serviceFactory/options/DeleteStateOptions';
import Config from './Config';
import checkStateWriteScopes from './utils/checkStateWriteScopes';
import validateActivityId from './utils/validateActivityId';

export default (config: Config) => {
  return async (opts: DeleteStateOptions): Promise<void> => {
    const client = opts.client;
    checkStateWriteScopes(client.scopes);
    validateActivityId(opts.activityId);

    const deleteResult = await config.repo.deleteState({
      activityId: opts.activityId,
      agent: opts.agent,
      client,
      registration: opts.registration,
      stateId: opts.stateId,
    });

    if (deleteResult.contentType !== 'application/json') {
      await config.repo.deleteStateContent({
        key: deleteResult.id,
      });
    }
  };
};
