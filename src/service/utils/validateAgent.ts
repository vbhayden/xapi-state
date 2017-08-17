import { pick } from 'lodash';
import * as rulr from 'rulr';
import * as xapi from 'xapi-validation/dist/factory';
import IfiCountWarning from 'xapi-validation/dist/warnings/IfiCountWarning';
import NoIfiWarning from 'xapi-validation/dist/warnings/NoIfiWarning';

const rule = rulr.maybe(rulr.composeRules([
  rulr.restrictToSchema({
    account: rulr.optional(xapi.account),
    mbox: rulr.optional(xapi.mailto),
    mbox_sha1sum: rulr.optional(xapi.sha1),
    name: rulr.optional(xapi.stringValue),
    objectType: rulr.optional(xapi.stringValue),
    openid: rulr.optional(xapi.iri),
  }),
  (data, path) => {
    const trimmedAgent = pick<any, any>(data, ['account', 'mbox', 'mbox_sha1sum', 'openid']);
    const keys = Object.keys(trimmedAgent);
    if (keys.length > 1) {
      return [new IfiCountWarning(data, path, keys)];
    }
    if (keys.length === 0) {
      return [new NoIfiWarning(data, path)];
    }
    return [];
  },
]));

export default (data: any) => {
  return rule(data, ['agent']);
};
