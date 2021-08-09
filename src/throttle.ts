import throttle from 'lodash.throttle';

interface ThrottleSettings {
  leading?: boolean;
  trailing?: boolean;
}

export function Throttle(milliseconds = 0, options?: ThrottleSettings) {
  return function _throttle(_target: Object, _propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    const descriptorCopy = { ...descriptor };
    descriptorCopy.value = function _new(...args: unknown[]) {
      const throttled = throttle(descriptor.value, milliseconds, options).bind(this);
      return throttled(...args);
    };
    return descriptorCopy;
  };
}
