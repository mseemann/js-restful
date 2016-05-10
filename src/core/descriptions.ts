import {permitAll, rolesAllowed} from "./namings";
/**
 * A heigher level description of a service. No need to parse
 * the Decortaors by yourself. Just use the @see ServiceParser.
 */
export class ServiceDescription {

    basePath: string | void;
    permitAll: boolean = false;
    rolesAllowed: string[] = [];

    methods: MethodDescription[] = [];
    private methodMap : { [key:string]:MethodDescription; } = {};

    addMethod(methodDescriptor:MethodDescription){
        this.methods.push(methodDescriptor);
        this.methodMap[methodDescriptor.methodName] = methodDescriptor;
    }

    getMethodDescriptorForMethodName(name:string): MethodDescription {
        return this.methodMap[name];
    }

    isSecurityContextUsed():boolean{
        if (this.permitAll || this.rolesAllowed.length>0){
            return true;
        }

        return this.methods.some( (method) => {
            return method.isSecurityContextUsed();
        })

    }
}

/**
 * Description of a parameter decorator.
 */
export class ParamDescription {
    // the name of the parameter - must match a parameter in the path.
    paramName:string;
    // the index of the parameter
    index:number;
}

/**
 * The supported HTTP-Method decorators
 */
export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}

export enum ContextTypes {
    HttpRequest,
    HttpResponse
}

/**
 * Description of a Service Method that is annotatded with at least a HTTP-Method.
 */
export class MethodDescription {
    
    methodName: string                      = null;
    httpMethod: HttpMethod                  = null;
    path:String | void                      = null;
    pathParams:ParamDescription[]           = [];
    headerParams:ParamDescription[]         = [];
    queryParams:ParamDescription[]          = [];
    contextParams:ParamDescription[]        = [];
    securityContextParam:ParamDescription   = null;
    permitAll:boolean                       = false;
    rolesAllowed:string[]                   = [];

    constructor(name:string, httpMethod:HttpMethod){
        this.methodName = name;
        this.httpMethod = httpMethod;
    }

    isSecurityContextUsed():boolean {
        if(this.permitAll || this.rolesAllowed.length>0){
            return true;
        }

        return this.securityContextParam ? true : false;
    }
}

export interface IUser {

}

export interface ISecurityContext {

    user:IUser;
    isUserInRole(roleName:string):boolean;
}