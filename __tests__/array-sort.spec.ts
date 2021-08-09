import { SortBy } from '../src';
import { SortByOptions } from '../src/sortby';

jest.useFakeTimers();

describe('arraySort', () => {
  function testClass(
    array: any[],
    sortByProperty: string,
    config?: SortByOptions,
  ) {
    class TestClass {
      @SortBy(sortByProperty, config)
      testingArray = array;
    }

    return new TestClass();
  }

  describe("Default Config: { isDescending: true, type: 'string', }", () => {
    it('should sort testing array in type string in descending order by default', () => {
      const testingArray = ['b', 'a', 'c'];
      const expectArray = ['c', 'b', 'a'];
      const instance = testClass(testingArray, '');
      expect(instance.testingArray).toEqual(expectArray);
    });
  });

  describe('Type: string', () => {
    it('should sort testing array by name property of string type in ascending order', () => {
      const testingArray = [{ name: 'b' }, { name: 'a' }, { name: 'c' }];
      const expectArray = [{ name: 'a' }, { name: 'b' }, { name: 'c' }];
      const instance = testClass(testingArray, 'name', {
        isDescending: false,
      });

      expect(instance.testingArray).toEqual(expectArray);
    });

    it('should sort testing array by name property of string type in descending order', () => {
      const testingArray = [{ name: 'b' }, { name: 'a' }, { name: 'c' }];
      const expectArray = [{ name: 'c' }, { name: 'b' }, { name: 'a' }];
      const instance = testClass(testingArray, 'name', {
        isDescending: true,
      });
      expect(instance.testingArray).toEqual(expectArray);
    });
  });

  describe('Type: date', () => {
    it('should be able to sort date in descending order', () => {
      const testingArray = [
        '2020-06-17',
        '2020-06-16',
        '2020-06-20',
        '2020-06-10',
      ];
      const instance = testClass(testingArray, '', {
        isDescending: true,
        type: 'date',
      });
      expect(instance.testingArray).toEqual([
        '2020-06-20',
        '2020-06-17',
        '2020-06-16',
        '2020-06-10',
      ]);
    });

    it('should be able to sort date in ascending order', () => {
      const testingArray = [
        '2020-06-17',
        '2020-06-16',
        '2020-06-20',
        '2020-06-10',
      ];
      const expectArray = [
        '2020-06-10',
        '2020-06-16',
        '2020-06-17',
        '2020-06-20',
      ];
      const instance = testClass(testingArray, '', {
        isDescending: false,
        type: 'date',
      });
      expect(instance.testingArray).toEqual(expectArray);
    });
  });

  describe('Type: number', () => {
    it('should be able to sort number value in descending order', () => {
      const testingArray = [0, 6, -1, 6, 3, -11, 4, 1];
      const expectArray = [6, 6, 4, 3, 1, 0, -1, -11];
      const instance = testClass(testingArray, '', {
        isDescending: true,
      });
      expect(instance.testingArray).toEqual(expectArray);
    });

    it('should be able to sort number value in ascending order', () => {
      const testingArray = [0, 6, -1, 6, 3, -11, 4, 1];
      const expectArray = [-11, -1, 0, 1, 3, 4, 6, 6];
      const instance = testClass(testingArray, '', {
        isDescending: false,
      });
      expect(instance.testingArray).toEqual(expectArray);
    });
  });

  describe('Nullish Values', () => {
    it('should push nullish values to the end of array', () => {
      const testingArray = [
        '2020-06-17',
        undefined,
        '2020-06-16',
        null,
        '2020-06-20',
        '2020-06-10',
      ];
      const expectArray = [
        '2020-06-20',
        '2020-06-17',
        '2020-06-16',
        '2020-06-10',
        null,
        undefined,
      ];
      const instance = testClass(testingArray, '', {
        isDescending: true,
        type: 'date',
      });
      expect(instance.testingArray).toEqual(expectArray);
    });
  });
});
