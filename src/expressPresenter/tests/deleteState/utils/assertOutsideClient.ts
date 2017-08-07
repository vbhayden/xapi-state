import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
  TEST_STATE_ID,
} from '../../../../utils/testValues';
import { NOT_FOUND_404_HTTP_CODE } from '../../../utils/httpCodes';
import supertest from '../../utils/supertest';

export default async () => {
  const activityId = TEST_ACTIVITY_ID;
  const agent = JSON.stringify(TEST_MBOX_AGENT);
  const registration = TEST_REGISTRATION;
  const stateId = TEST_STATE_ID;
  await supertest
    .delete('/xAPI/activities/state')
    .query({ activityId, agent, registration, stateId })
    .expect(NOT_FOUND_404_HTTP_CODE);
};
