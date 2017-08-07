/* tslint:disable:no-let */
import Conflict from '../errors/Conflict';
import OverwriteStateOptions from '../repoFactory/options/OverwriteStateOptions';
import OverwriteStateResult from '../repoFactory/results/OverwriteStateResult';
import Config from './Config';
import checkEtag from './utils/checkEtag';
import checkMaxEtags from './utils/checkMaxEtags';
import createState from './utils/createState';
import matchUniqueState from './utils/matchUniqueState';

export default (config: Config) => {
  return async (opts: OverwriteStateOptions): Promise<OverwriteStateResult> => {
    // Overwrites the content if the state does already exist.
    let existingId: string|undefined;
    const { activityId, stateId, client, ifMatch, ifNoneMatch } = opts;
    checkMaxEtags(ifMatch, ifNoneMatch);
    config.state.states = config.state.states.map((state) => {
      const isMatch = matchUniqueState({ client, activityId, state, stateId });

      if (!isMatch) {
        return state;
      }

      checkEtag({ state, ifMatch, ifNoneMatch });

      if (ifMatch === undefined && ifNoneMatch === undefined) {
        throw new Conflict();
      }

      existingId = state.id;
      return {
        ...state,

        // Overwrites the content and contentType.
        content: opts.content,
        contentType: opts.contentType,
        etag: opts.etag,

        // Updates updatedAt time.
        updatedAt: new Date(),
      };
    });

    // Creates the State if the state doesn't already exist.
    if (existingId === undefined) {
      const createdState = createState(config, opts);
      return { id: createdState.id };
    }

    return { id: existingId };
  };
};
