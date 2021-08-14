export function Measure(): MethodDecorator {
  return function _measure(target: Object, propertyKey: PropertyKey, descriptor: PropertyDescriptor) {
    const descriptorCopy = { ...descriptor };
    const name = target.constructor.name ? `${target.constructor.name}.${String(propertyKey)}` : String(propertyKey);

    descriptorCopy.value = function _fn(...args: unknown[]) {
      const start = performance.now();
      const result = descriptor.value.apply(this, args);
      const end = performance.now();
      // eslint-disable-next-line no-console
      console.log(`Call to ${name} took ${(end - start).toFixed(2)} milliseconds.`);
      return result;
    };
    return descriptorCopy;
  };
}
