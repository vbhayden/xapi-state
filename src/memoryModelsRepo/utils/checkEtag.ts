import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import State from '../../models/State';

interface Options {
  readonly state: State;
  readonly ifMatch?: string;
  readonly ifNoneMatch?: string;
}

export default ({ state, ifMatch, ifNoneMatch }: Options) => {
  if (ifMatch !== undefined && state.etag !== ifMatch) {
    throw new IfMatch();
  }

  if (ifNoneMatch !== undefined && ifNoneMatch === '*') {
    throw new IfNoneMatch();
  }
};
