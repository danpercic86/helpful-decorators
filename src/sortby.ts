const sortFunc = <T>(a: T, b: T) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};

export interface SortByOptions {
  isDescending: boolean;
  type?: 'date';
}

/**
 * Sort array by a specific element property, its value type must be one of string, number and date
 * @param {string | undefined} sortByProperty specify a property from each element that sorting will be based on, undefined means sorty by element itself
 * @param {
      isDescending: boolean;
      sortByPropertyType: string;
    } options
 * @returns script version
 */
export function SortBy<T>(
  sortByProperty: keyof T,
  options: SortByOptions = { isDescending: true },
) {
  const cachedValueKey = Symbol('cache');
  return function _sortBy(
    target: Object,
    propertyKey: string,
    _descriptor?: PropertyDescriptor,
  ) {
    Object.defineProperty(target, propertyKey, {
      set(arr: Array<T>) {
        if (!arr || !Array.isArray(arr)) {
          throw new TypeError(`Value of property ${propertyKey} is not a valid array!`);
        }

        const isDateType = options.type === 'date';
        if (sortByProperty) {
          this[cachedValueKey] = arr.sort((a: any, b: any) => {
            const aValue = isDateType
              ? new Date(a[sortByProperty])
              : a[sortByProperty];
            const bValue = isDateType
              ? new Date(b[sortByProperty])
              : b[sortByProperty];
            const sortResult = sortFunc(aValue, bValue);
            return options.isDescending ? sortResult * -1 : sortResult;
          });
        } else {
          this[cachedValueKey] = arr.sort((a: any, b: any) => {
            const aValue = isDateType ? new Date(a) : a;
            const bValue = isDateType ? new Date(b) : b;
            const sortResult = sortFunc(aValue, bValue);
            return options.isDescending ? sortResult * -1 : sortResult;
          });
        }
      },
      get() {
        return this[cachedValueKey];
      },
    });
  };
}
