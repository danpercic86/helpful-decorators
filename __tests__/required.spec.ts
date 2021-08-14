import { Required } from "../src";

jest.useFakeTimers();

describe('required', () => {
  class TestThrottle {
    @Required() input!: string;

    @Required((thisArg: TestThrottle) => thisArg.val1 === 7) someValue?: string

    @Required((thisArg: TestThrottle) => thisArg.val2 === 2) someValue2?: string

    val1 = 6

    val2 = 2
  }

  it('should call required', () => {
    const test = new TestThrottle();
    expect(() => test.input).toThrowError()
    test.input = 'something'
    expect(test.input).toBe('something')
    test.input = 'something else'
    expect(test.input).toBe('something else')
    expect(() => test.someValue2).toThrowError()
    expect(test.someValue).toBeUndefined()
  });
});
