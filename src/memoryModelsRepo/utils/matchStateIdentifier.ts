import ClientModel from '../../models/ClientModel';
import State from '../../models/State';

interface Options {
  readonly client: ClientModel;
  readonly activityId: string;
  readonly state: State;
}

export default ({ client, activityId, state }: Options) => {
  return (
    state.organisation === client.organisation &&
    state.lrs === client.lrs_id &&
    state.activityId === activityId
  );
};
