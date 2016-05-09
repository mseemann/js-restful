import { ParamDescription } from './descriptions';

export class DecoratorUtil {

    /**
     * create param decorators
     * @param value the value for the decorator
     * @param key the key under wich the value is saved
     * @returns the decorated function
     */
    static createParamDecorator(value: string, key: string){
        return function(target: Object, propertyKey: string | symbol, parameterIndex: number){
            let existingDecorators: ParamDescription[] = Reflect.getOwnMetadata(key, target, propertyKey) || [];
            existingDecorators.push({paramName:value, index: parameterIndex});
            Reflect.defineMetadata(key, existingDecorators, target, propertyKey);
        }
    }
}