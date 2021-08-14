import memoize from 'lodash.memoize';

export function Memo(resolver?: (...args: unknown[]) => unknown): MethodDecorator {
  return function _memo(_target: Object, _propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    const descriptorCopy = { ...descriptor }
    descriptorCopy.value = memoize(descriptor.value, resolver);
    return descriptorCopy;
  };
}
