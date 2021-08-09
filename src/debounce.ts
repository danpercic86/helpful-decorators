import debounce from 'lodash.debounce';

interface DebounceSettings {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

export function Debounce(milliseconds = 0, options?: DebounceSettings) {
  return function _debounce(_target: Object, _propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    const map = new WeakMap();
    const descriptorCopy = { ...descriptor };

    descriptorCopy.value = function _new(...args: unknown[]) {
      let debounced = map.get(this);
      if (!debounced) {
        debounced = debounce(descriptor.value, milliseconds, options).bind(this);
        map.set(this, debounced);
      }
      return debounced(...args);
    };

    return descriptorCopy;
  };
}
