import * as rulr from 'rulr';
import * as xapi from 'xapi-validation/dist/factory';

const rule = rulr.maybe(rulr.optional(xapi.uuid));

export default (data?: string) => {
  return rule(data, ['registration']);
};
