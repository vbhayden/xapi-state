import * as assert from 'assert';
import * as streamToString from 'stream-to-string';
import service from './testService';
import {
  TEST_ACTIVITY_ID,
  TEST_CLIENT,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from './testValues';

export default async (content: string) => {
  const expectedStateIds = [TEST_STATE_ID];

  // Checks the stateIds.
  const statesResult = await service.getStates({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
  });
  const actualStateIds = statesResult.stateIds;
  assert.deepEqual(actualStateIds, expectedStateIds);

  // Checks the content.
  const agentStateResult = await service.getState({
    activityId: TEST_ACTIVITY_ID,
    agent: TEST_MBOX_AGENT,
    client: TEST_CLIENT,
    registration: TEST_REGISTRATION,
    stateId: TEST_STATE_ID,
  });
  const actualContent = await streamToString(agentStateResult.content);
  assert.equal(actualContent, content);
  assert.equal(agentStateResult.contentType.constructor, String);
  assert.equal(agentStateResult.updatedAt.constructor, Date);
  assert.equal(agentStateResult.etag.constructor, String);
};
