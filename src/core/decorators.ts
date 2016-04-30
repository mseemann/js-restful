import 'reflect-metadata';
import * as namings from './namings';
import { ParamDescription } from './descriptions';


function createHttpMethodFunction(httpMethod:string){
    return function(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
        Reflect.defineMetadata(httpMethod, true, descriptor.value);
    }
}

/**
 * Publish a method as an http endpoint for GET requests. If no Path is specified the path will be /.
 * The decorator is only allowed on methods.
 * @returns the decorated function
 */
export function GET() { return createHttpMethodFunction(namings.getMethod); }

/**
 * Publish a method as an http endpoint for POST requests. If no Path is specified the path will be /.
 * The decorator is only allowed on methods.
 * @returns the decorated function
 */
export function POST() { return createHttpMethodFunction(namings.postMethod); }

/**
 * Publish a method as an http endpoint for PUT requests. If no Path is specified the path will be /.
 * The decorator is only allowed on methods.
 * @returns the decorated function
 */
export function PUT() { return createHttpMethodFunction(namings.putMethod); }

/**
 * Publish a method as an http endpoint for DELETE requests. If no Path is specified the path will be /.
 * The decorator is only allowed on methods.
 * @returns the decorated function
 */
export function DELETE() { return createHttpMethodFunction(namings.deleteMethod); }


/**
 * Specify the Path for teh ressource. If the decorator is present at class level all methods paths will be
 * prefixed with this path. 
 * @param path The path for the class or method. The path must not be start with /. 
 * The slash will be added automatically.
 * @returns the decorated function
 */
export function Path (path:string) : Function {

    return function(target: Function, propertyKey: string, descriptor: PropertyDescriptor){
        if(!propertyKey && !descriptor){
            // add meta data to the class itself - e.g. target is the constructor and propertyKey and serviceDescription are undefined
            return Reflect.defineMetadata(namings.path, path, target);
        } else {
            // add meta data to a function
            return Reflect.defineMetadata(namings.path, path, descriptor.value);
        }
    }
}

function createParamDecorator(name: string, pathParamKey: string){
    return function(target: Object, propertyKey: string | symbol, parameterIndex: number){
        let existingPathParams: ParamDescription[] = Reflect.getOwnMetadata(pathParamKey, target, propertyKey) || [];
        existingPathParams.push({pathParam:name, index: parameterIndex});
        Reflect.defineMetadata(pathParamKey, existingPathParams, target, propertyKey);
    }
}


/**
 * Specifies how a method parameter is evealuated. In this case the value will be taken
 * from the parameter that is specified in the path decorator.
 * @param name the name in the path that should be used to provide the parameter to the method.
 * @returns the decorated function
 */
export function PathParam(name:string){ return createParamDecorator(name, namings.pathParam);}


/**
 * Specifies how a method parameter is evealuated. In this case the value will be taken
 * from a http header.
 * @param name the name in the http header that should be used to provide the parameter to the method.
 * @returns the decorated function
 */
export function HeaderParam(name:string){ return createParamDecorator(name, namings.headerParam);}