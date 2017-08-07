/* tslint:disable:no-let */
import { isPlainObject } from 'lodash';
import NonJsonObject from '../errors/NonJsonObject';
import PatchStateOptions from '../repoFactory/options/PatchStateOptions';
import Config from './Config';
import checkEtag from './utils/checkEtag';
import checkMaxEtags from './utils/checkMaxEtags';
import createState from './utils/createState';
import matchUniqueState from './utils/matchUniqueState';

export default (config: Config) => {
  return async (opts: PatchStateOptions): Promise<void> => {
    // Patches the content if the state does already exist.
    let isExistingState = false;
    const { activityId, stateId, client, ifMatch, ifNoneMatch } = opts;
    checkMaxEtags(ifMatch, ifNoneMatch);
    config.state.states = config.state.states.map((state) => {
      const isMatch = matchUniqueState({ client, activityId, state, stateId });
      const isJson = (
        isMatch &&
        state.contentType === 'application/json' &&
        isPlainObject(state.content)
      );

      if (!isMatch) {
        return state;
      }

      checkEtag({ state, ifMatch, ifNoneMatch });

      isExistingState = true;
      if (!isJson) {
        throw new NonJsonObject();
      }

      return {
        ...state,

        // Merges top-level properties in content.
        content: {
          ...state.content,
          ...opts.content,
        },
        etag: opts.etag,

        // Updates updatedAt time.
        updatedAt: new Date(),
      };
    });

    // Creates the State if the state doesn't already exist.
    if (!isExistingState) {
      createState(config, opts);
    }
  };
};
