/* tslint:disable:readonly-keyword */
import State from '../models/State';

interface RepoState {
  states: State[];
}

interface Config {
  state: RepoState;
}

export default Config;
