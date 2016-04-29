import 'reflect-metadata';
import * as namings from './namings';


function createHttpMethodFunction(httpMethod:string){
    return function(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
        Reflect.defineMetadata(namings.buildFullName(httpMethod), true, descriptor.value);
    }
}

/**
 * Publish a method as an http endpoint for get requests.
 * @returns teh decorated function
 */
export function GET() { return createHttpMethodFunction(namings.getMethod); }
export function POST() { return createHttpMethodFunction(namings.postMethod); }
export function PUT() { return createHttpMethodFunction(namings.putMethod); }
export function DELETE() { return createHttpMethodFunction(namings.deleteMethod); }


export function Path (path:string) : Function {
    return function(target: Function, propertyKey: string, descriptor: PropertyDescriptor){
        if(!propertyKey && !descriptor){
            // add meta data to the class itself - e.g. target is the constructor and propertyKey and descriptor are undefined
            return Reflect.defineMetadata(namings.buildFullName(namings.path), path, target);
        } else {
            // add meta data to a function
            return Reflect.defineMetadata(namings.buildFullName(namings.path), path, descriptor.value);
        }
    }
}


export class PathParamDescription {
    pathParam:string;
    index:number;
}


function createParamDecorator(name: string, pathParamKey: string){
    return function(target: Object, propertyKey: string | symbol, parameterIndex: number){
        let existingPathParams: PathParamDescription[] = Reflect.getOwnMetadata(pathParamKey, target, propertyKey) || [];
        existingPathParams.push({pathParam:name, index: parameterIndex});
        Reflect.defineMetadata(pathParamKey, existingPathParams, target, propertyKey);
    }
}

const pathParamKey = namings.buildFullName(namings.pathParam);
const headerParamKey = namings.buildFullName(namings.headerParam);

export function PathParam(name:string){ return createParamDecorator(name, pathParamKey);}
export function HeaderParam(name:string){ return createParamDecorator(name, headerParamKey);}