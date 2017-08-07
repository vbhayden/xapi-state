/* tslint:disable:no-let */
import NoModel from 'jscommons/dist/errors/NoModel';
import IfMatch from '../errors/IfMatch';
import DeleteStateOptions from '../repoFactory/options/DeleteStateOptions';
import DeleteStateResult from '../repoFactory/results/DeleteStateResult';
import Config from './Config';
import matchStateIdentifier from './utils/matchStateIdentifier';

export default (config: Config) => {
  return async (opts: DeleteStateOptions): Promise<DeleteStateResult> => {
    const storedStates = config.state.states;
    const client = opts.client;
    const activityId = opts.activityId;
    let existingId: string|undefined;
    let existingContentType: string|undefined;
    const remainingStates = storedStates.filter((state) => {
      const isMatch = (
        matchStateIdentifier({ client, activityId, state }) &&
        state.stateId === opts.stateId
      );

      if (isMatch) {
        existingId = state.id;
        existingContentType = state.contentType;

        if (opts.ifMatch !== undefined && state.etag !== opts.ifMatch) {
          throw new IfMatch();
        }
      }

      return !isMatch;
    });

    if (existingId !== undefined && existingContentType !== undefined) {
      config.state.states = remainingStates;
      return { id: existingId, contentType: existingContentType };
    }

    throw new NoModel('State');
  };
};
