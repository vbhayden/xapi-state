import * as stringToStream from 'string-to-stream';
import service from '../../../../utils/testService';
import {
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from '../../../../utils/testValues';

export default async (activityId: string, content: string) => {
  await service.overwriteState({
    activityId,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(content),
    contentType: TEXT_CONTENT_TYPE,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
  });
};
