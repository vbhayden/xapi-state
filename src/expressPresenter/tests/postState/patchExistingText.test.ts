import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import { CLIENT_ERROR_400_HTTP_CODE } from '../../utils/httpCodes';
import setup from '../utils/setup';
import createContent from './utils/createContent';
import patchContent from './utils/patchContent';

describe('expressPresenter.postState with existing text content', () => {
  setup();

  const createTextContent = async () => {
    await createContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
  };

  it('should error when patching with text content', async () => {
    await createTextContent();
    await patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should error when patching with JSON content', async () => {
    await createTextContent();
    await patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE).expect(CLIENT_ERROR_400_HTTP_CODE);
  });

  it('should error when patching with object content', async () => {
    await createTextContent();
    await patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE).expect(CLIENT_ERROR_400_HTTP_CODE);
  });
});
