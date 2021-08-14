export function Delay(milliseconds: number = 0): MethodDecorator {
  return function _delay(_target: Object, _propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    const descriptorCopy = { ...descriptor }

    descriptorCopy.value = function _new(...args: unknown[]) {
      setTimeout(() => {
        descriptor.value.apply(this, args);
      }, milliseconds);
    };
    return descriptorCopy;
  };
}
