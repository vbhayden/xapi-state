import {
  TEST_ACTIVITY_ID,
  TEST_MBOX_AGENT,
  TEST_REGISTRATION,
} from '../../../../utils/testValues';
import { OK_200_HTTP_CODE } from '../../../utils/httpCodes';
import supertest from '../../utils/supertest';

export default async () => {
  const activityId = TEST_ACTIVITY_ID;
  const agent = JSON.stringify(TEST_MBOX_AGENT);
  const registration = TEST_REGISTRATION;
  await supertest
    .get('/xAPI/activities/state')
    .query({ activityId, agent, registration })
    .expect(OK_200_HTTP_CODE, []);
};
