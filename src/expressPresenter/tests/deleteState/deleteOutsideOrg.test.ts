import { TEST_CLIENT_OUTSIDE_ORG } from '../../../utils/testValues';
import overwriteStateOutsideClient from '../utils/overwriteStateOutsideClient';
import patchStateOutsideClient from '../utils/patchStateOutsideClient';
import setup from '../utils/setup';
import assertOutsideClient from './utils/assertOutsideClient';

describe('expressPresenter.deleteState outside the organisation', () => {
  setup();

  it('should error when deleting a overwritten model', async () => {
    await overwriteStateOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertOutsideClient();
  });

  it('should error when deleting a patched model', async () => {
    await patchStateOutsideClient(TEST_CLIENT_OUTSIDE_ORG);
    await assertOutsideClient();
  });
});
