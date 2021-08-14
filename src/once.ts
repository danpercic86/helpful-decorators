import once from 'lodash.once'

export function Once(): MethodDecorator {
  return function _once(_target: Object, _propertyKey: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {...descriptor, value: once(descriptor.value)};
  };
}
