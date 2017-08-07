import { createRequiredWarning, Warnings } from 'rulr';

export default (contentTypeHeader: string|undefined) => {
  /* istanbul ignore next - superagent always sends a content type */
  if (contentTypeHeader === undefined) {
    const warnings = [createRequiredWarning(contentTypeHeader, ['headers', 'Content-Type'])];
    throw new Warnings({}, ['headers'], warnings);
  }

  return contentTypeHeader;
};
