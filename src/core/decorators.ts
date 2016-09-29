import * as namings from './namings';
import {ParamDescription, HttpMethod, ContextTypes} from './descriptions';
import { DecoratorUtil } from './decoratorUtil';

function createHttpMethodFunction(httpMethod:HttpMethod){
    return function(target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) {
        Reflect.defineMetadata(namings.httpMethodMarker, httpMethod, descriptor.value);
    }
}

/**
 * Publish a method as an http endpoint for GET requests. If no Path is specified the path will be /.
 * The decorator is only allowed on methods.
 * @returns the decorated function
 */
export function GET() { return createHttpMethodFunction(HttpMethod.GET); }

/**
 * Publish a method as an http endpoint for POST requests. If no Path is specified the path will be /.
 * The decorator is only allowed on methods.
 * @returns the decorated function
 */
export function POST() { return createHttpMethodFunction(HttpMethod.POST); }

/**
 * Publish a method as an http endpoint for PUT requests. If no Path is specified the path will be /.
 * The decorator is only allowed on methods.
 * @returns the decorated function
 */
export function PUT() { return createHttpMethodFunction(HttpMethod.PUT); }

/**
 * Publish a method as an http endpoint for DELETE requests. If no Path is specified the path will be /.
 * The decorator is only allowed on methods.
 * @returns the decorated function
 */
export function DELETE() { return createHttpMethodFunction(HttpMethod.DELETE); }


/**
 * Specify the Path for the ressource. If the decorator is present at class level all methods paths will be
 * prefixed with this path. 
 * @param path The path for the class or method. The path must not be start with /. 
 * The slash will be added automatically.
 * @returns the decorated function
 */
export function Path (path:string) : Function {
    return DecoratorUtil.decorateClassOrMethod(namings.path, path);
}


/**
 * Specifies how a method parameter is evealuated. In this case the value will be taken
 * from the parameter that is specified in the path decorator.
 * @param name the name in the path that should be used to provide the parameter to the method.
 * @returns the decorated function
 */
export function PathParam(name:string){ return DecoratorUtil.createParamDecorator(name, namings.pathParam);}


/**
 * Specifies how a method parameter is evaluated. In this case the value will be taken
 * from a http header.
 * @param name the name in the http header that should be used to provide the parameter to the method.
 * @returns the decorated function
 */
export function HeaderParam(name:string){ return DecoratorUtil.createParamDecorator(name, namings.headerParam);}

/**
 * Specifies how a method parameter is evaluated. In this case the value will be taken
 * from a url query parameter.
 * @param name the name of the query param that should be used to provide the parameter to the method.
 * @returns the decorated function
 */
export function QueryParam(name:string){ return DecoratorUtil.createParamDecorator(name, namings.queryParam);}

/**
 * Specifies how a method parameter is evaluated. In this case the value will be taken
 * from the context (for example the current Request).
 * @param contextType the ContextTypes that should be used to provide the parameter to the method.
 * @returns the decorated function
 */
export function Context(contextType:ContextTypes){ return DecoratorUtil.createParamDecorator(ContextTypes[contextType], namings.contextParam);}

/**
 * Specifies a method parameter that is a ISecurityContext
 * @returns the decorated function
 */
export function  SecurityContext(){
    return function(target: Object, propertyKey: string | symbol, parameterIndex: number){
        Reflect.defineMetadata(namings.securityContextParam, {paramName:"SecurityContext", index: parameterIndex}, target, propertyKey);
    }
};

export function PermitAll() : Function {
    return DecoratorUtil.decorateClassOrMethod(namings.permitAll, true);
}

export function RolesAllowed(roles:string[]) : Function {
    return DecoratorUtil.decorateClassOrMethod(namings.rolesAllowed, roles);
}