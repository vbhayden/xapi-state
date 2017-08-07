import { Response } from 'express';
import { Options as CommonOptions } from 'jscommons/dist/expressPresenter/utils/handleError';
import commonErrorHandler from 'jscommons/dist/expressPresenter/utils/handleError';
import sendMessage from 'jscommons/dist/expressPresenter/utils/sendMessage';
import { isNull, isUndefined } from 'lodash';
import { Warnings } from 'rulr';
import Conflict from '../../errors/Conflict';
import IfMatch from '../../errors/IfMatch';
import IfNoneMatch from '../../errors/IfNoneMatch';
import InvalidContentType from '../../errors/InvalidContentType';
import InvalidMethod from '../../errors/InvalidMethod';
import MaxEtags from '../../errors/MaxEtags';
import NonJsonObject from '../../errors/NonJsonObject';
import Translator from '../../translatorFactory/Translator';
import {
  CLIENT_ERROR_400_HTTP_CODE,
  CONFLICT_409_HTTP_CODE,
  PRECONDITION_FAILED_412_HTTP_CODE,
  SERVER_ERROR_500_HTTP_CODE,
} from './httpCodes';
import sendWarnings from './sendWarnings';

interface Options extends CommonOptions {
  readonly translator: Translator;
}

export default ({ translator, errorId, res, err }: Options): Response => {
  /* istanbul ignore next - all server errors expected during tests are caught */
  if (isNull(err) || isUndefined(null)) {
    const code = SERVER_ERROR_500_HTTP_CODE;
    const message = translator.serverError();
    return sendMessage({ res, code, errorId, message });
  }

  switch (err.constructor) {
    case InvalidContentType: {
      const code = CLIENT_ERROR_400_HTTP_CODE;
      const message = translator.invalidContentTypeError(err as InvalidContentType);
      return sendMessage({ res, code, errorId, message });
    } case MaxEtags: {
      const code = CLIENT_ERROR_400_HTTP_CODE;
      const message = translator.maxEtagsError(err as MaxEtags);
      return sendMessage({ res, code, errorId, message });
    } case Conflict: {
      const code = CONFLICT_409_HTTP_CODE;
      const message = translator.conflictError(err as Conflict);
      return sendMessage({ res, code, errorId, message });
    } case IfMatch: {
      const code = PRECONDITION_FAILED_412_HTTP_CODE;
      const message = translator.ifMatchError(err as IfMatch);
      return sendMessage({ res, code, errorId, message });
    } case IfNoneMatch: {
      const code = PRECONDITION_FAILED_412_HTTP_CODE;
      const message = translator.ifNoneMatchError(err as IfNoneMatch);
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
