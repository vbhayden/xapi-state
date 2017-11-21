import { route, xapiHeaderVersion } from '../../../utils/constants';
import { ALTERNATE_CONTENT_TYPE } from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';

describe('expressPresenter using the alternate request syntax', () => {
  const { supertest } = setup();

  it('should return error when using an invalid method', async () => {
    await supertest
      .post(route)
      .set('Content-Type', ALTERNATE_CONTENT_TYPE)
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'invalid_method' })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should return error when using an invalid content type', async () => {
    await supertest
      .post(route)
      .set('Content-Type', 'invalid_content_type')
      .set('X-Experience-API-Version', xapiHeaderVersion)
      .query({ method: 'GET' })
      .expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
