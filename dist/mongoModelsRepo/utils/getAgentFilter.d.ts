import Agent from '../../models/Agent';
declare const _default: (agent: Agent) => {
    'agent.mbox': string;
    'agent.mbox_sha1sum'?: undefined;
    'agent.openid'?: undefined;
    'agent.account.homePage'?: undefined;
    'agent.account.name'?: undefined;
} | {
    'agent.mbox_sha1sum': string;
    'agent.mbox'?: undefined;
    'agent.openid'?: undefined;
    'agent.account.homePage'?: undefined;
    'agent.account.name'?: undefined;
} | {
    'agent.openid': string;
    'agent.mbox'?: undefined;
    'agent.mbox_sha1sum'?: undefined;
    'agent.account.homePage'?: undefined;
    'agent.account.name'?: undefined;
} | {
    'agent.account.homePage': string;
    'agent.account.name': string;
    'agent.mbox'?: undefined;
    'agent.mbox_sha1sum'?: undefined;
    'agent.openid'?: undefined;
};
export default _default;
