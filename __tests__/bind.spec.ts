import { Bind } from "../src";

jest.useFakeTimers();

describe('bind', () => {
  class TestThrottle {
    msg = 'Throttle Worked with value ';

    @Bind()
    method() {
      return this.msg
    }
  }

  it('should call bind', () => {
    const test = new TestThrottle();
    expect(test.method.name).toBe('bound method')
    expect(test.method()).toBe(test.msg)
  });
});
