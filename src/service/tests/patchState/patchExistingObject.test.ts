import assertError from 'jscommons/dist/tests/utils/assertError';
import NonJsonObject from '../../../errors/NonJsonObject';
import assertImmutableState from '../../../utils/assertImmutableState';
import assertState from '../../../utils/assertState';
import createImmutableState from '../../../utils/createImmutableState';
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
import patchState from './utils/patchState';

describe('patchState with existing object content', () => {
  setup();

  const createObjectContent = async () => {
    await createState(TEST_OBJECT_CONTENT, JSON_CONTENT_TYPE);
  };

  it('should error when patching with text content', async () => {
    await createObjectContent();
    const promise = patchContent(TEST_CONTENT, TEXT_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should error when patching with JSON content', async () => {
    await createObjectContent();
    const promise = patchContent(TEST_JSON_CONTENT, JSON_CONTENT_TYPE);
    await assertError(NonJsonObject, promise);
  });

  it('should merge when patching with object content', async () => {
    await createObjectContent();
    await patchContent('{"bar": 2}', JSON_CONTENT_TYPE);
    await assertState('{"foo":1,"bar":2}');
  });

  it('should merge when patching without registration', async () => {
    await createObjectContent();
    await patchState({ registration: undefined }, '{"bar": 2}');
    await assertState('{"foo":1,"bar":2}');
  });

  it('should not patch existing models when patching a non-existing model', async () => {
    await patchState();
    await createImmutableState();
    await patchState();
    await assertImmutableState();
  });
});
