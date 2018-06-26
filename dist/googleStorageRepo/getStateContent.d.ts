import GetStateContentOptions from '../repoFactory/options/GetStateContentOptions';
import GetStateContentResult from '../repoFactory/results/GetStateContentResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStateContentOptions) => Promise<GetStateContentResult>;
export default _default;
