/// <reference types="node" />
import Agent from '../../models/Agent';
import ClientModel from '../../models/ClientModel';
export default interface Options {
    readonly activityId: string;
    readonly agent: Agent;
    readonly client: ClientModel;
    readonly content: NodeJS.ReadableStream;
    readonly contentType: string;
    readonly registration?: string;
    readonly stateId: string;
}
