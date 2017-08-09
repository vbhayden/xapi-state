import assertError from 'jscommons/dist/tests/utils/assertError';
import NonJsonObject from '../../../errors/NonJsonObject';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEST_OBJECT_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import createState from './utils/createState';
import patchContent from './utils/patchContent';

describe('patchState with existing text content', () => {
  setup();

  const createTextContent = async () => {
    await createState(TEST_CONTENT, TEXT_CONTENT_TYPE);
  };

  it('should error when patching with text content', async () => {
    await createTextContent();
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    await createTextContent();
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with object content', async () => {
    await createTextContent();
    const promise = patchContent(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });
});
