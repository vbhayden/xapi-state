import { extension } from 'mime-types';

export default (contentType: string) => {
  if (contentType === 'application/json') {
    return 'json';
  }
  const ext = extension(contentType);
  console.log('ext', ext);
  if (ext === false) {
    return 'bin';
  }
  return ext;
};
