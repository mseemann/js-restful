import 'reflect-metadata';
import * as namings from './namings';


export function Path (path:string) : Function {
    return function(target: Function){
        Reflect.defineMetadata('jsrestful::Path', path, target);
    }
}

function createHttpMethodFunction(httpMethod:string){
    return function(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
        Reflect.defineMetadata(namings.buildFullName(httpMethod), true, descriptor.value);
    }
}

export function GET() { return createHttpMethodFunction(namings.getMethod); }
export function POST() { return createHttpMethodFunction(namings.postMethod); }
export function PUT() { return createHttpMethodFunction(namings.putMethod); }
export function DELETE() { return createHttpMethodFunction(namings.deleteMethod); }


export function PathParam(name:string){
    return function(target: Object, propertyKey: string | symbol, parameterIndex: number){
        let existingPathParams: any[] = Reflect.getOwnMetadata('jsrestful::PathParam', target, propertyKey) || [];
        existingPathParams.push({pathParam:name, index: parameterIndex});
        Reflect.defineMetadata('jsrestful::PathParam', existingPathParams, target, propertyKey);
    }
}