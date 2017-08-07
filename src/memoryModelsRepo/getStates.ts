import State from '../models/State';
import GetStatesOptions from '../repoFactory/options/GetStatesOptions';
import GetStatesResult from '../repoFactory/results/GetStatesResult';
import Config from './Config';
import matchStateIdentifier from './utils/matchStateIdentifier';

const matchStateSince = (state: State, since?: Date) => {
  return since === undefined ? true : state.updatedAt > since;
};

export default (config: Config) => {
  return async (opts: GetStatesOptions): Promise<GetStatesResult> => {
    const client = opts.client;
    const activityId = opts.activityId;
    const matchingStates = config.state.states.filter((state) => {
      return (
        matchStateIdentifier({ client, activityId, state }) &&
        matchStateSince(state, opts.since)
      );
    });

    const stateIds = matchingStates.map((state) => {
      return state.stateId;
    });

    return { stateIds };
  };
};
