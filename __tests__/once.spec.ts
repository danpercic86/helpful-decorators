import { Once } from '../src';

jest.useFakeTimers();

describe('once', () => {
  class TestOnce {
    @Once()
    method() {
      console.log('Once Worked!');
    }
  }

  it('should call the method only once', () => {
    const instance = new TestOnce();
    const consoleSpy = jest.spyOn(console, 'log');
    instance.method();
    instance.method();
    instance.method();
    expect(consoleSpy).toBeCalled();
    expect(consoleSpy).toHaveBeenCalledTimes(1);
  });
});
