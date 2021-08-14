/**
 *
 * Credit: https://github.com/NoHomey/bind-decorator/blob/master/src/index.ts
 * Return a descriptor removing the value and returning a getter
 * The getter will return a .bind version of the function
 *
 */

export function Bind(): MethodDecorator {
  return function _bind(_target: Object, propertyKey: PropertyKey, descriptor: PropertyDescriptor): PropertyDescriptor {
    return {
      configurable: true,
      get() {
        const boundMethod = descriptor.value.bind(this);
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
