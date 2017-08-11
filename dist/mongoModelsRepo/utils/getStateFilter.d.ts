import { ObjectID } from 'mongodb';
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
export interface Options {
    readonly activityId: string;
    readonly agent: Agent;
    readonly client: ClientModel;
    readonly registration?: string;
    readonly stateId: string;
}
declare const _default: (opts: Options) => {
    lrs: ObjectID;
    organisation: ObjectID;
    'agent.mbox': string;
    activityId: string;
    stateId: string;
} | {
    lrs: ObjectID;
    organisation: ObjectID;
    registration: string;
    'agent.mbox': string;
    activityId: string;
    stateId: string;
} | {
    lrs: ObjectID;
    organisation: ObjectID;
    'agent.mbox_sha1sum': string;
    activityId: string;
    stateId: string;
} | {
    lrs: ObjectID;
    organisation: ObjectID;
    registration: string;
    'agent.mbox_sha1sum': string;
    activityId: string;
    stateId: string;
} | {
    lrs: ObjectID;
    organisation: ObjectID;
    'agent.openid': string;
    activityId: string;
    stateId: string;
} | {
    lrs: ObjectID;
    organisation: ObjectID;
    registration: string;
    'agent.openid': string;
    activityId: string;
    stateId: string;
} | {
    lrs: ObjectID;
    organisation: ObjectID;
    'agent.account.homePage': string;
    'agent.account.name': string;
    activityId: string;
    stateId: string;
} | {
    lrs: ObjectID;
    organisation: ObjectID;
    registration: string;
    'agent.account.homePage': string;
    'agent.account.name': string;
    activityId: string;
    stateId: string;
};
export default _default;
