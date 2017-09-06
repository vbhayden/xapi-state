import { extension } from 'mime-types';

export default (contentType: string) => {
  if (contentType === 'application/json') {
    return 'json';
  }
  const ext = extension(contentType);
  if (ext === false) {
    return 'bin';
  }
  return ext;
};
