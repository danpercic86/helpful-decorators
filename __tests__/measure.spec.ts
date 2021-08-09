import {Measure} from '../src';

const fibonacci = (n: number): number => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
};

jest.useFakeTimers();

describe('measure', () => {
  class Calculator {
    @Measure()
    sum(a: number, b: number): number {
      return a + b;
    }

    @Measure()
    longRun(n: number): number {
      return fibonacci(n);
    }

    @Measure()
    async asyncLongRun(n: number): Promise<number> {
      return fibonacci(n);
    }
  }

  it('measure decorator test', async () => {
    const calculator = new Calculator();
    expect(calculator.sum(10, 10)).toBe(20);
    expect(await calculator.asyncLongRun(40)).toBe(102334155);
    expect(calculator.longRun(40)).toBe(102334155);
  });
});
