import assertState from '../../../utils/assertState';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE, NO_CONTENT_204_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import createObjectContent from './utils/createObjectContent';
import patchContent from './utils/patchContent';
import patchExistingContent from './utils/patchExistingContent';

describe('expressPresenter.postState with existing object content', () => {
  setup();

  it('should error when patching with text content', async () => {
    await createObjectContent();
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should error when patching with JSON content', async () => {
    await createObjectContent();
    await patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should merge when patching with object content', async () => {
    await createObjectContent();
    await patchExistingContent('{"bar": 2}', JSON_CONTENT_TYPE, NO_CONTENT_204_HTTP_CODE);
    await assertState('{"foo":1,"bar":2}');
  });
});
