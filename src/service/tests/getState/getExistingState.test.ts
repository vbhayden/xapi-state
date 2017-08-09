import * as assert from 'assert';
import NoModel from 'jscommons/dist/errors/NoModel';
import assertError from 'jscommons/dist/tests/utils/assertError';
import * as streamToString from 'stream-to-string';
import createJsonState from '../../../utils/createJsonState';
import createTextState from '../../../utils/createTextState';
import {
  JSON_CONTENT_TYPE,
  TEST_CONTENT,
  TEST_JSON_CONTENT,
  TEXT_CONTENT_TYPE,
} from '../../../utils/testValues';
import setup from '../utils/setup';
import getState from './utils/getState';

describe('getState with existing state', () => {
  setup();

  it('should get when getting text', async () => {
    await createTextState();
    const agentStateResult = await getState();
    const actualContent = await streamToString(agentStateResult.content);
    assert.equal(actualContent, TEST_CONTENT);
    assert.equal(agentStateResult.contentType, TEXT_CONTENT_TYPE);
    assert.equal(agentStateResult.updatedAt.constructor, Date);
    assert.equal(agentStateResult.etag.constructor, String);
  });

  it('should get when getting json', async () => {
    await createJsonState();
    const agentStateResult = await getState();
    const actualContent = await streamToString(agentStateResult.content);
    assert.equal(actualContent, TEST_JSON_CONTENT);
    assert.equal(agentStateResult.contentType, JSON_CONTENT_TYPE);
    assert.equal(agentStateResult.updatedAt.constructor, Date);
    assert.equal(agentStateResult.etag.constructor, String);
  });

  it('should get when not using registration', async () => {
    await createTextState();
    const agentStateResult = await getState({
      registration: undefined,
    });
    const actualContent = await streamToString(agentStateResult.content);
    assert.equal(actualContent, TEST_CONTENT);
    assert.equal(agentStateResult.contentType, TEXT_CONTENT_TYPE);
    assert.equal(agentStateResult.updatedAt.constructor, Date);
    assert.equal(agentStateResult.etag.constructor, String);
  });

  it('should error when getting existing model without a registration with one', async () => {
    await createTextState({ registration: undefined });
    const promise = getState();
    await assertError(NoModel, promise);
  });
});
