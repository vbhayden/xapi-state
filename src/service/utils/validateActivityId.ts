import * as rulr from 'rulr';
import * as xapi from 'xapi-validation/dist/factory';

export default (data: string) => {
  return rulr.maybe(xapi.iri)(data, ['activityId']);
};
