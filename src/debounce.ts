import debounce from 'lodash.debounce';

interface DebounceSettings {
  readonly leading?: boolean;
  readonly maxWait?: number;
  readonly trailing?: boolean;
}

export function Debounce(milliseconds = 0, options?: DebounceSettings): MethodDecorator {
  return function _debounce(_target: unknown, _propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    const map = new WeakMap();
    const descriptorCopy = {...descriptor};
    descriptorCopy.value = function _value(...args: unknown[]): void {
      let debounced = map.get(this);
      if (!debounced) {
        debounced = debounce(descriptor.value, milliseconds, options).bind(this);
        map.set(this, debounced);
      }
      debounced(...args);
    };
    return descriptorCopy;
  };
}
