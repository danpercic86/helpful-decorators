import { Debounce } from '../src';

jest.mock('lodash.debounce');

const debounceFn = require('lodash.debounce');

jest.useFakeTimers();

describe('debounce', () => {
  const func = function called() {
    return 'called';
  };

  debounceFn.mockImplementation(() => func);

  class TestDebounce {
    @Debounce(3000)
    method() {
      console.log('Debounce Worked!');
    }
  }

  it('should call debounce', () => {
    new TestDebounce().method();
    expect(debounceFn).toBeCalled();
    expect(debounceFn.mock.calls[0][1]).toEqual(3000);
  });
});
