import * as stringToStream from 'string-to-stream';
import service from './testService';
import {
  TEST_CLIENT,
  TEST_IMMUTABLE_ACTIVITY_ID,
  TEST_IMMUTABLE_CONTENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
  TEXT_CONTENT_TYPE,
} from './testValues';

export default async () => {
  await service.overwriteState({
    activityId: TEST_IMMUTABLE_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    content: stringToStream(TEST_IMMUTABLE_CONTENT),
    contentType: TEXT_CONTENT_TYPE,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
  });
};
