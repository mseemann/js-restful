import { ParamDescription } from './decorators';

export class RestDescriptor {

    basePath: string | void;

    methods: MethodDescriptor[] = [];
    private methodMap : { [key:string]:MethodDescriptor; } = {};

    addMethod(methodDescriptor:MethodDescriptor){
        this.methods.push(methodDescriptor);
        this.methodMap[methodDescriptor.methodName] = methodDescriptor;
    }

    getMethodDescriptorForMethodName(name:string): MethodDescriptor {
        return this.methodMap[name];
    }
}

export enum HttpMethod {
    GET,
    POST,
    PUT,
    DELETE
}

export class MethodDescriptor {
    methodName: string              = null;
    httpMethod: HttpMethod          = null;
    path:String | void              = null;
    pathParams:ParamDescription[]   = [];
    headerParams:ParamDescription[] = [];

    constructor(name:string, httpMethod:HttpMethod){
        this.methodName = name;
        this.httpMethod = httpMethod;
    }
}