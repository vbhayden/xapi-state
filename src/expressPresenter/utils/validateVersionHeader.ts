import * as rulr from 'rulr';
import { version as validateVersion } from 'xapi-validation/dist/factory';

const versionHeaderValidator = rulr.maybe(rulr.required(validateVersion));
export default (headerVal?: string) => {
  versionHeaderValidator(headerVal, ['header', 'X-Experience-API-Version']);
};
