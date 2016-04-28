import 'reflect-metadata';

export function Path (path:string) : Function {
    return function(target: Function){
        Reflect.defineMetadata('jsrestful::Path', path, target);
    }
}

export function GET()  {
    return function(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {

        // var originalMethod = descriptor.value;
        // descriptor.value = function (...args:any[]) {
        //   var a = args.map(a => JSON.stringify(a)).join();
        //   // note usage of originalMethod here
        //   var result = originalMethod.apply(this, args);
        //   var r = JSON.stringify(result);
        //   console.log(`Call: ${key}(${a}) => ${r}`);
        //   return result;
        // }

        Reflect.defineMetadata('jsrestful::GET', true, descriptor.value);

        return descriptor;
    }
}

export function PathParam(name:string){
    return function(target: Object, propertyKey: string | symbol, parameterIndex: number){
        let existingPathParams: any[] = Reflect.getOwnMetadata('jsrestful::PathParam', target, propertyKey) || [];
        existingPathParams.push({pathParam:name, index: parameterIndex});
        Reflect.defineMetadata('jsrestful::PathParam', existingPathParams, target, propertyKey);
    }
}