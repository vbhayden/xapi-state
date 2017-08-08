import * as rulr from 'rulr';
import * as xapi from 'xapi-validation/dist/factory';

const rule = rulr.maybe(xapi.iri);

export default (data: string) => {
  return rule(data, ['activityId']);
};
