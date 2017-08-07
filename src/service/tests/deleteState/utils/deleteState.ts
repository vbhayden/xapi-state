import service from '../../../../utils/testService';
import {
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';

export default async (activityId: string) => {
  await service.deleteState({
    activityId,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
  });
};
