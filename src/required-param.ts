import 'reflect-metadata';

const requiredMetadataKey = Symbol('required');

function getMethodParams(target: Record<string, unknown>, propertyKey: string): string[] {
  const functionParams = String(target[ propertyKey ]).split('(')[ 1 ].split(')')[ 0 ];
  return functionParams.split(',').map(param => param.replace(' ', ''));
}

export function RequiredParam() {
  return function _required(target: Record<string, unknown>, propertyKey: string, parameterIndex: number): void {
    const existingRequiredParameters = <number[]>Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
    existingRequiredParameters.push(parameterIndex);
    Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
  };
}

/**
 * Usage:
 * @example
 *
 *    //@Validate() methodToValidate(@RequiredParam() param1, @RequiredParam param2, param3)
 *
 * @constructor
 */

export function Validate() {
  return function _validate(target: unknown, propertyName: string, descriptor: PropertyDescriptor): void {
    const method = descriptor.value as (...args: unknown[]) => unknown;
    const methodParams = getMethodParams(target as Record<string, unknown>, propertyName);

    // eslint-disable-next-line no-param-reassign
    descriptor.value = function _value(...args: unknown[]) {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const requiredParameters = <number[]>Reflect.getOwnMetadata(requiredMetadataKey, target as Object, propertyName);

      if (!requiredParameters) {
        return method?.apply(this, args);
      }

      requiredParameters.forEach(parameterIndex => {
        if (parameterIndex >= args.length || args[ parameterIndex ] === undefined) {
          throw new Error(
            `Required parameter ${methodParams[ parameterIndex ]} was null or undefined when calling ${propertyName}`,
          );
        }
      })

      return method?.apply(this, args);
    };
  };
}
