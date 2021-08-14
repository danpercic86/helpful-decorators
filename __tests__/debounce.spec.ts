import { Debounce } from '../src';

jest.useFakeTimers();
const log = jest.fn((...args) => console.log(...args));

describe('debounce', () => {
  class TestDebounce {
    msg = 'Debounce Worked!';

    @Debounce(500)
    method(specificMsg: string) {
      log(this.msg, specificMsg);
    }
  }

  it('should call debounce',  () => {
    const test = new TestDebounce();
    test.method('a')
    test.method('b')
    test.method('c')
    test.method('d')
    test.method('e')
    jest.advanceTimersByTime(600)
    expect(log.mock.calls[0][1]).toEqual('e');
  });
});
