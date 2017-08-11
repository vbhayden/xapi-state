import Agent from '../../models/Agent';
declare const _default: (agent: Agent) => {
    'agent.mbox': string;
} | {
    'agent.mbox_sha1sum': string;
} | {
    'agent.openid': string;
} | {
    'agent.account.homePage': string;
    'agent.account.name': string;
};
export default _default;
