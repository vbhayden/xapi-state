import { Test } from 'supertest';
import patchState from './patchState';

export default (content: string, contentType: string): Test => {
  return patchState({}, content, contentType);
};
