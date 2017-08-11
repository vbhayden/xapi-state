import GetStatesOptions from '../serviceFactory/options/GetStatesOptions';
import GetStatesResult from '../serviceFactory/results/GetStatesResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStatesOptions) => Promise<GetStatesResult>;
export default _default;
