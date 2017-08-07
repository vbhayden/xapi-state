import ClientModel from '../../models/ClientModel';
import State from '../../models/State';
import matchStateIdentifier from './matchStateIdentifier';

interface Options {
  readonly client: ClientModel;
  readonly activityId: string;
  readonly state: State;
  readonly stateId: string;
}

export default ({ client, activityId, state, stateId }: Options) => {
  return (
    matchStateIdentifier({ client, activityId, state }) &&
    state.stateId === stateId
  );
};
