import throttle from 'lodash.throttle';

interface ThrottleSettings {
  readonly leading?: boolean;
  readonly trailing?: boolean;
}

export function Throttle(wait = 0, options?: ThrottleSettings): MethodDecorator {
  return function _throttle(_target: Object, _propertyKey: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
    const descriptorCopy = {...descriptor};
    descriptorCopy.value = throttle(descriptor.value, wait, options);
    return descriptorCopy;
  };
}
