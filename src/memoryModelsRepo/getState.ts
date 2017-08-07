import NoModel from 'jscommons/dist/errors/NoModel';
import GetStateOptions from '../repoFactory/options/GetStateOptions';
import GetStateResult from '../repoFactory/results/GetStateResult';
import Config from './Config';
import matchStateIdentifier from './utils/matchStateIdentifier';

export default (config: Config) => {
  return async (opts: GetStateOptions): Promise<GetStateResult> => {
    const client = opts.client;
    const activityId = opts.activityId;
    const matchingStates = config.state.states.filter((state) => {
      return (
        matchStateIdentifier({ client, activityId, state }) &&
        state.stateId === opts.stateId
      );
    });

    const isExistingIfi = matchingStates.length !== 0;
    if (!isExistingIfi) {
      throw new NoModel('State');
    }

    const { id, content, contentType, updatedAt, etag } = matchingStates[0];
    return { id, content, contentType, updatedAt, etag };
  };
};
