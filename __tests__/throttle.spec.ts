import { Throttle } from '../src';

jest.mock('lodash.throttle');

const throttleFn = require('lodash.throttle');

jest.useFakeTimers();

describe('throttle', () => {
  const func = function called() {
    return 'called';
  };

  throttleFn.mockImplementation(() => func);

  class TestThrottle {
    @Throttle(3000)
    method() {
      // eslint-disable-next-line no-console
      console.log('Throttle Worked!');
    }
  }

  it('should call throttle', () => {
    new TestThrottle().method();
    expect(throttleFn.mock.calls.length).toBe(1);
    expect(throttleFn.mock.calls[0][1]).toEqual(3000);
  });
});
