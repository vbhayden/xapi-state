import GetStateOptions from '../repoFactory/options/GetStateOptions';
import GetStateResult from '../repoFactory/results/GetStateResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStateOptions) => Promise<GetStateResult>;
export default _default;
