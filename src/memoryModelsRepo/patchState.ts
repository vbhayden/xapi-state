import { isPlainObject } from 'lodash';
import NonJsonObject from '../errors/NonJsonObject';
import PatchStateOptions from '../repoFactory/options/PatchStateOptions';
import Config from './Config';
import createState from './utils/createState';
import isMatchingState from './utils/isMatchingState';

export default (config: Config) => {
  return async (opts: PatchStateOptions): Promise<void> => {
    const storedStates = config.state.states;
    const matchingStates = storedStates.filter((state) => {
      return isMatchingState(state, opts);
    });

    // Patches the state if it does exist, otherwise it creates the state.
    if (matchingStates.length === 0) {
      createState(config, opts);
      return;
    }

    const update = {
      contentType: opts.contentType,
      etag: opts.etag,
      updatedAt: new Date(),
    };
    const updatedStates = storedStates.map((state) => {
      if (!isMatchingState(state, opts)) {
        return state;
      }
      if (state.contentType !== 'application/json' || !isPlainObject(state.content)) {
        throw new NonJsonObject();
      }
      const content = {
        ...state.content,
        ...opts.content,
      };
      return { ...state, ...update, content };
    });
    config.state.states = updatedStates;
  };
};
