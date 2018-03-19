import TypeWarning from '@learninglocker/xapi-validation/dist/warnings/TypeWarning';
import CommonTranslator from 'jscommons/dist/translatorFactory/Translator';
import ExpiredClientError from '../errors/ExpiredClientError';
import InvalidMethod from '../errors/InvalidMethod';
import JsonSyntaxError from '../errors/JsonSyntaxError';
import NonJsonObject from '../errors/NonJsonObject';

interface Translator extends CommonTranslator {
  readonly expiredClientError: (err: ExpiredClientError) => string;
  readonly invalidMethodError: (err: InvalidMethod) => string;
  readonly nonJsonObjectError: (err: NonJsonObject) => string;
  readonly xapiTypeWarning: (err: TypeWarning) => string;
  readonly jsonSyntaxError: (err: JsonSyntaxError) => string;
}

export default Translator;
