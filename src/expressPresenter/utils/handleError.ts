import { Response } from 'express';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import { isNull, isUndefined } from 'lodash';
import { Warnings } from 'rulr';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidMethod from '../../errors/InvalidMethod';
import JsonSyntaxError from '../../errors/JsonSyntaxError';
import NonJsonObject from '../../errors/NonJsonObject';
import Translator from '../../translatorFactory/Translator';
import { xapiHeaderVersion } from '../../utils/constants';
import {
  CLIENT_ERROR_400_HTTP_CODE,
  SERVER_ERROR_500_HTTP_CODE,
} from './httpCodes';
import sendWarnings from './sendWarnings';

export interface Options extends CommonOptions {
  readonly translator: Translator;
}

export default ({ translator, errorId, res, err }: Options): Response => {
  res.setHeader('X-Experience-API-Version', xapiHeaderVersion);
  /* istanbul ignore next - all server errors expected during tests are caught */
  if (isNull(err) || isUndefined(null)) {
    const code = SERVER_ERROR_500_HTTP_CODE;
    const message = translator.serverError();
    return sendMessage({ res, code, errorId, message });
  }

  switch (err.constructor) {
    case JsonSyntaxError: {
      const code = CLIENT_ERROR_400_HTTP_CODE;
      const message = translator.jsonSyntaxError(err as JsonSyntaxError);
      return sendMessage({ res, code, errorId, message });
    } case InvalidContentType: {
      const code = CLIENT_ERROR_400_HTTP_CODE;
      const message = translator.invalidContentTypeError(err as InvalidContentType);
      return sendMessage({ res, code, errorId, message });
    } case NonJsonObject: {
      const code = CLIENT_ERROR_400_HTTP_CODE;
      const message = translator.nonJsonObjectError(err as NonJsonObject);
      return sendMessage({ res, code, errorId, message });
    } case Warnings: {
      const code = CLIENT_ERROR_400_HTTP_CODE;
      const warnings = (err as Warnings).warnings;
      return sendWarnings({ res, code, errorId, warnings, translator });
    } case InvalidMethod: {
      const code = CLIENT_ERROR_400_HTTP_CODE;
      const message = translator.invalidMethodError(err as InvalidMethod);
      return sendMessage({ res, code, errorId, message });
    } default: {
      return commonErrorHandler({ translator, errorId, res, err });
    }
  }
};
