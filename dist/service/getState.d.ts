import GetStateOptions from '../serviceFactory/options/GetStateOptions';
import GetStateResult from '../serviceFactory/results/GetStateResult';
import Config from './Config';
declare const _default: (config: Config) => (opts: GetStateOptions) => Promise<GetStateResult>;
export default _default;
