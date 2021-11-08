export type NonUndefined<T> = T extends undefined ? never : T;

export type FunctionKeys<T> = {
  [K in keyof T]-?: NonUndefined<T[K]> extends Function ? K : never;
}[keyof T];

export interface SimpleChange<T> {
  readonly previousValue: T;
  readonly currentValue: T;
  readonly isFirstChange: boolean;
}

export type CallBackFunction<T> = (value: T, change: SimpleChange<T>) => void;

type TypedPropertyDecorator<C> = (target: C, key: PropertyKey) => void;

const CACHED_VALUE_KEY = Symbol('Key where the value will be cached');
const IS_FIRST_CHANGE_KEY = Symbol("Key where we'll store if it's first change");

interface Instance<T> {
  [CACHED_VALUE_KEY]: T;
  [IS_FIRST_CHANGE_KEY]: boolean;

  [key: string]: unknown;
}

export function OnChange<T, C extends Object = Object>(callback: CallBackFunction<T> | FunctionKeys<C> | string): PropertyDecorator | TypedPropertyDecorator<C> {
  return function _onChange(target: C, key: PropertyKey) {
    Object.defineProperty(target, key, {
      set(value: T) {
        const instance = this as Instance<T>;
        const callBackFn = <CallBackFunction<T>>(typeof callback === 'string' ? instance[callback] : callback);
        if (!callBackFn) {
          throw new Error(`Cannot find method ${String(callback)} in class ${target.constructor.name}`);
        }

        instance[IS_FIRST_CHANGE_KEY] = instance[IS_FIRST_CHANGE_KEY] === undefined;

        // No operation if new value is same as old value
        if (!instance[IS_FIRST_CHANGE_KEY] && instance[CACHED_VALUE_KEY] === value) {
          return;
        }

        const oldValue = instance[CACHED_VALUE_KEY];
        instance[CACHED_VALUE_KEY] = value;

        const simpleChange: SimpleChange<T> = {
          previousValue: oldValue,
          currentValue: instance[CACHED_VALUE_KEY],
          isFirstChange: instance[IS_FIRST_CHANGE_KEY],
        };

        callBackFn.call(instance, instance[CACHED_VALUE_KEY], simpleChange);
      },
      get(): T {
        return (this as Instance<T>)[CACHED_VALUE_KEY];
      },
    });
  };
}
