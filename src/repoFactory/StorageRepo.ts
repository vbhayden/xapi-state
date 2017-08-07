import CommonRepo from 'jscommons/dist/repoFactory/Repo';
import DeleteStateContentOptions from './options/DeleteStateContentOptions';
import GetStateContentOptions from './options/GetStateContentOptions';
import StoreStateContentOptions from './options/StoreStateContentOptions';
import GetStateContentResult from './results/GetStateContentResult';

interface Repo extends CommonRepo {
  readonly deleteStateContent: (opts: DeleteStateContentOptions) => Promise<void>;
  readonly getStateContent: (opts: GetStateContentOptions) => Promise<GetStateContentResult>;
  readonly storeStateContent: (opts: StoreStateContentOptions) => Promise<void>;
}

export default Repo;
