import commonTranslator from 'jscommons/dist/translatorFactory/en';
import stringPath from 'jscommons/dist/translatorFactory/utils/stringPath';
import Translator from './Translator';

const translator: Translator = {
  conflictError: () => (
    'Get the state to retrieve the Etag, then set the If-Match header to the Etag'
  ),
  ifMatchError: () => (
    'IfMatch does not match Etag because a modification has been made since it was retrieved'
  ),
  ifNoneMatchError: () => (
    'IfNoneMatch was used to detect that the resource was already present'
  ),
  invalidContentTypeError: (err) => (
    `Content type (${err.contentType}) is invalid for alternate request syntax`
  ),
  invalidMethodError: (err) => (
    `Method (${err.method}) is invalid for alternate request syntax`
  ),
  maxEtagsError: () => (
    'IfMatch and IfNoneMatch cannot be used at the same time'
  ),
  nonJsonObjectError: () => (
    'Expected a JSON object to be provided and stored (if it exists)'
  ),
  xapiTypeWarning: (warning) => {
    const path = stringPath(warning.path);
    return `Expected ${warning.typeName} in ${path}`;
  },
  ...commonTranslator,
};

export default translator;
