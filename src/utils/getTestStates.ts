import GetStatesOptions from '../serviceFactory/options/GetStatesOptions';
import service from './testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from './testValues';

export default (optsOverrides: Partial<GetStatesOptions> = {}) => {
  return service.getStates({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
    ...optsOverrides,
  });
};
