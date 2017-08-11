import GetClientOptions from '../serviceFactory/options/GetClientOptions';
import GetClientResult from '../serviceFactory/results/GetClientResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetClientOptions) => Promise<GetClientResult>;
export default _default;
