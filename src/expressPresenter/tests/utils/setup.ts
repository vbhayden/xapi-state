import setupService from 'jscommons/dist/tests/utils/setupService';
import service from '../../../utils/testService';
import supertest from './supertest';

const setup = setupService(service);

export default () => {
  setup();
  return { service, supertest };
};
