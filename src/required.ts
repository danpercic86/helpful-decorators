export type Condition<T> = (thisArg: T) => boolean;

export function Required<T>(condition: Condition<T> = () => true): PropertyDecorator {
    return function _required(target: Object, propertyKey: PropertyKey) {
        Object.defineProperty(target, propertyKey, {
          // eslint-disable-next-line getter-return
            get(): never | void {
                if (condition(this)) throw new Error(`Attribute ${String(propertyKey)} is required`);
            },
            set(value) {
                Object.defineProperty(this, propertyKey, {
                    value,
                    writable: true
                });
            }
        });
    };
}
