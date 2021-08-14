import once from 'lodash.once'

type Func = (...args: unknown[]) => unknown

export function Once() {
  return function _once<T extends Func>(_target: Object, _propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> {
    if (!descriptor?.value && typeof descriptor.value !== 'function') {
      throw new TypeError(`@Once() decorator can only be applied to methods, not to ${typeof descriptor.value}`);
    }

    return {...descriptor, value: once<T>(descriptor.value)};
  };
}
