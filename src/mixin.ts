export function Mixin(baseConstructors: Function[]): any {
  return function _mixin(derivedConstructor: Function) {
    baseConstructors.forEach(constructor => {
      Object.getOwnPropertyNames(constructor.prototype).forEach(name => {
        derivedConstructor.prototype[name] = constructor.prototype[name];
      });
    });
  };
}
