import * as supertest from 'supertest';

export default (request: supertest.Request, ifMatch?: string, ifNoneMatch?: string) => {
  if (ifMatch !== undefined) {
    request.set('If-Match', `"${ifMatch}"`);
  }
  if (ifNoneMatch !== undefined) {
    request.set('If-None-Match', `"${ifNoneMatch}"`);
  }
  return request;
};
