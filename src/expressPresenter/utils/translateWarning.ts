import commonTranslateWarning from 'jscommons/dist/expressPresenter/utils/translateWarning';
import { Warning } from 'rulr';
import TypeWarning from 'xapi-validation/dist/warnings/TypeWarning';
import Translator from '../../translatorFactory/Translator';

export default (translator: Translator, warning: Warning) => {
  switch (warning.constructor) {
    case TypeWarning:
      return translator.xapiTypeWarning(warning as TypeWarning);
    default:
      return commonTranslateWarning(translator, warning);
  }
};
