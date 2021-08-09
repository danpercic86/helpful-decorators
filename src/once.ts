const onceFn = require('lodash.once');

export function Once() {
  return function _once(_target: Object, _propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = onceFn(originalMethod);
    return descriptor;
  };
}
