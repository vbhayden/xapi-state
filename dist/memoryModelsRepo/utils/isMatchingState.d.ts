import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import State from '../../models/State';
export interface Options {
    readonly activityId: string;
    readonly agent: Agent;
    readonly client: ClientModel;
    readonly registration?: string;
    readonly stateId: string;
}
declare const _default: (state: State, opts: Options) => boolean;
export default _default;
