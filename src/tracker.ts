import fakeTracker from 'jscommons/dist/tracker/fake';
import Tracker from 'jscommons/dist/tracker/Tracker';

/* istanbul ignore next */
const trackerFactory = async (): Promise<Tracker> => {
  return fakeTracker;
};

export default trackerFactory();
