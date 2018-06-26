import GetClientOptions from '../repoFactory/options/GetClientOptions';
import GetClientResult from '../repoFactory/results/GetClientResult';
import Config from './Config';
declare const _default: (config: Config) => ({ authToken }: GetClientOptions) => Promise<GetClientResult>;
export default _default;
