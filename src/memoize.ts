const memoizeFn = require('lodash.memoize');

export function Memo(resolver?: unknown) {
  return function _memo(_target: Object, _propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.value = memoizeFn(descriptor.value, resolver);
    return descriptor;
  };
}
