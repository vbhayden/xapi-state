/* tslint:disable:deprecation - find isn't really deprecated */
import DeleteStatesOptions from '../repoFactory/options/DeleteStatesOptions';
import DeleteStatesResult from '../repoFactory/results/DeleteStatesResult';
import Config from './Config';
import getStatesFilter from './utils/getStatesFilter';

export default (config: Config) => {
  return async (opts: DeleteStatesOptions): Promise<DeleteStatesResult> => {
    const collection = (await config.db).collection('states');

    const stateFilter = getStatesFilter(opts);

    const stateDocuments = await collection.find(stateFilter)
      .project({_id: 1, contentType: 1})
      .toArray();

    const ids = stateDocuments.map((state: any) => {
      return state._id;
    });

    await collection.deleteMany({_id: {$in: ids}}, {});

    const deletedStates = stateDocuments.map((state: any) => {
      return {
        contentType: state.contentType,
        id: state._id.toString(),
      };
    });
    return { states: deletedStates };
  };
};