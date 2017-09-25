import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
import State from '../../models/State';
import Config from '../Config';
export interface Options {
    readonly activityId: string;
    readonly agent: Agent;
    readonly client: ClientModel;
    readonly content: any;
    readonly contentType: string;
    readonly extension: string;
    readonly etag: string;
    readonly registration?: string;
    readonly stateId: string;
}
declare const _default: (config: Config, opts: Options) => State;
export default _default;
