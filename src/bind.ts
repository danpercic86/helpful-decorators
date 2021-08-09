/**
 *
 * Credit: https://github.com/NoHomey/bind-decorator/blob/master/src/index.ts
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 *
 */

export function Bind(): MethodDecorator {
  return function _bind<T>(_target: Object, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<T>) {
    if (typeof descriptor.value !== 'function') {
      throw new TypeError(`@Bind() decorator can only be applied to methods, not to ${typeof descriptor.value}`);
    }

    return {
      configurable: true,
      get(): T {
        // @ts-ignore
        const boundMethod: T = descriptor.value!.bind(this);
        Object.defineProperty(this, propertyKey, {
          value: boundMethod,
          configurable: true,
          writable: true,
        });
        return boundMethod;
      },
    };
  };
}
