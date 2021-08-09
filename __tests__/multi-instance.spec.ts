import { Debounce } from '../src';

jest.mock('lodash.debounce', () => (func: Function, wait: number) => {
  // eslint-disable-next-line no-undef
  let timeout: NodeJS.Timeout;
  return function _fn(this: any, ...args: unknown[]) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
});

jest.useFakeTimers();

class Test {
  id: number;

  constructor(id: number) {
    this.id = id;
  }

  @Debounce(3000)
  method() {
    this.id += 1;
  }
}

describe('Multi instance support', () => {
  describe('Debounce', () => {
    it('should work with multi instance', () => {
      const classA = new Test(1);
      const classB = new Test(100);
      classA.method();
      jest.advanceTimersByTime(1000);
      classB.method();
      jest.advanceTimersByTime(2001);
      expect(classA.id).toBe(2);
      jest.advanceTimersByTime(1000);
      expect(classB.id).toBe(101);
    });
  });
});
