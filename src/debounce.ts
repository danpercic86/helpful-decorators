import debounce from 'lodash.debounce';

interface DebounceSettings {
  readonly leading?: boolean;
  readonly maxWait?: number;
  readonly trailing?: boolean;
}

export function Debounce(milliseconds = 0, options?: DebounceSettings): MethodDecorator {
  return function _debounce(_target: Object, _propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    const descriptorCopy = {...descriptor};
    descriptorCopy.value = debounce(descriptor.value, milliseconds, options);
    return descriptorCopy;
  };
}
