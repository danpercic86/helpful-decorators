import { Throttle } from '../src';


jest.useFakeTimers();
const log = jest.fn((...args) => console.log(...args));

describe('throttle', () => {
  class TestThrottle {
    val = 5;

    msg = 'Throttle Worked with value ';

    @Throttle(500)
    method(specificMsg: string) {
      log(this.msg, this.val, specificMsg);
    }
  }

  it('should call throttle', () => {
    const test = new TestThrottle();
    test.method('a');
    test.method('b');
    test.method('c');
    expect(log.mock.calls.length).toBe(1);
    expect(log.mock.calls[0][0]).toBe(test.msg);
    expect(log.mock.calls[0][1]).toBe(test.val);
    expect(log.mock.calls[0][2]).toBe('a');
  });
});
