import GetStatesOptions from '../repoFactory/options/GetStatesOptions';
import GetStatesResult from '../repoFactory/results/GetStatesResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStatesOptions) => Promise<GetStatesResult>;
export default _default;
