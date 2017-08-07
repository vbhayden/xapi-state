import CommonTranslator from 'jscommons/dist/translatorFactory/Translator';
import TypeWarning from 'xapi-validation/dist/warnings/TypeWarning';
import Conflict from '../errors/Conflict';
import IfMatch from '../errors/IfMatch';
import IfNoneMatch from '../errors/IfNoneMatch';
import InvalidContentType from '../errors/InvalidContentType';
import InvalidMethod from '../errors/InvalidMethod';
import MaxEtags from '../errors/MaxEtags';
import NonJsonObject from '../errors/NonJsonObject';

interface Translator extends CommonTranslator {
  readonly conflictError: (err: Conflict) => string;
  readonly ifMatchError: (err: IfMatch) => string;
  readonly ifNoneMatchError: (err: IfNoneMatch) => string;
  readonly invalidContentTypeError: (err: InvalidContentType) => string;
  readonly invalidMethodError: (err: InvalidMethod) => string;
  readonly maxEtagsError: (err: MaxEtags) => string;
  readonly nonJsonObjectError: (err: NonJsonObject) => string;
  readonly xapiTypeWarning: (err: TypeWarning) => string;
}

export default Translator;
