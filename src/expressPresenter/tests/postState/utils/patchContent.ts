import patchState from './patchState';

export default (content: string, contentType: string) => {
  return patchState({}, content, contentType);
};
