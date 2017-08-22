import NoModel from 'jscommons/dist/errors/NoModel';
import GetClientOptions from '../repoFactory/options/GetClientOptions';
import GetClientResult from '../repoFactory/results/GetClientResult';
import {
  TEST_CLIENT,
  TEST_CLIENT_OUTSIDE_ORG,
  TEST_CLIENT_OUTSIDE_STORE,
  TEST_INVALID_SCOPE_CLIENT,
  TEST_INVALID_SCOPE_TOKEN,
  TEST_MISSING_TOKEN,
  TEST_OUTSIDE_ORG_TOKEN,
  TEST_OUTSIDE_STORE_TOKEN,
  TEST_VALID_SCOPE_CLIENT,
  TEST_VALID_SCOPE_TOKEN,
} from '../utils/testValues';
import Config from './Config';

export default (_config: Config) => {
  return async (opts: GetClientOptions): Promise<GetClientResult> => {
    switch (opts.authToken) {
      case TEST_INVALID_SCOPE_TOKEN:
        return { client: TEST_INVALID_SCOPE_CLIENT };
      case TEST_VALID_SCOPE_TOKEN:
        return { client: TEST_VALID_SCOPE_CLIENT };
      case TEST_OUTSIDE_ORG_TOKEN:
        return { client: TEST_CLIENT_OUTSIDE_ORG };
      case TEST_OUTSIDE_STORE_TOKEN:
        return { client: TEST_CLIENT_OUTSIDE_STORE };
      case TEST_MISSING_TOKEN:
        throw new NoModel('Client');
      default:
        return { client: TEST_CLIENT };
    }
  };
};
