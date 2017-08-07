import * as stringToStream from 'string-to-stream';
import service from '../../../../utils/testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';

export default async (content: string, contentType: string) => {
  await service.patchState({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(content),
    contentType,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
  });
};
