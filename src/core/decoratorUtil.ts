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

    /**
     * create decorators for the class or for a method
     * @param key he key under wich the value is saved
     * @param value the value for the decorator
     * @returns the decorated function
     */
    static decorateClassOrMethod(key:string, value:any){
        return function (target:Object, propertyKey:string, descriptor:PropertyDescriptor) {
            if (!propertyKey && !descriptor) {
                // add meta data to the class itself - e.g. target is the constructor and propertyKey and serviceDescription are undefined
                return Reflect.defineMetadata(key, value, target);
            } else {
                // add meta data to a function
                return Reflect.defineMetadata(key, value, descriptor.value);
            }
        }
    }
}