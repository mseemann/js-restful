/**
 * A heigher level description of a service. No need to parse
 * the Decortaors by yourself. Just use the @see ServiceParser.
 */
export class ServiceDescription {

    basePath: string | void;

    methods: MethodDescription[] = [];
    private methodMap : { [key:string]:MethodDescription; } = {};

    addMethod(methodDescriptor:MethodDescription){
        this.methods.push(methodDescriptor);
        this.methodMap[methodDescriptor.methodName] = methodDescriptor;
    }

    getMethodDescriptorForMethodName(name:string): MethodDescription {
        return this.methodMap[name];
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

/**
 * Description of a Service Method that is annotatded with at least a HTTP-Method.
 */
export class MethodDescription {
    
    methodName: string              = null;
    httpMethod: HttpMethod          = null;
    path:String | void              = null;
    pathParams:ParamDescription[]   = [];
    headerParams:ParamDescription[] = [];
    queryParams:ParamDescription[]  = [];

    constructor(name:string, httpMethod:HttpMethod){
        this.methodName = name;
        this.httpMethod = httpMethod;
    }
}