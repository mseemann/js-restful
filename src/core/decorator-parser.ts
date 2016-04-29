import 'reflect-metadata';
import { RestDescriptor, MethodDescriptor, HttpMethod } from "./descriptor";
import { ParamDescription } from './decorators';
import * as namings from './namings';

class Parser {

    descriptor:RestDescriptor = new RestDescriptor();

    private HttpMethodMap : { [key:string]:HttpMethod; } = {};

    constructor(){

        this.HttpMethodMap[namings.getMethod] = HttpMethod.GET;
        this.HttpMethodMap[namings.postMethod] = HttpMethod.POST;
        this.HttpMethodMap[namings.putMethod] = HttpMethod.PUT;
        this.HttpMethodMap[namings.deleteMethod] = HttpMethod.DELETE;

    }

    parseBasePath(service: Object) : string | void {
        let path =  Reflect.getMetadata(namings.path, service.constructor);
        return path ? path : null;
    }

    parseMethodDescriptions(service): MethodDescriptor[] {

        var methods:MethodDescriptor[] = [];

        for (let name of Object.getOwnPropertyNames(Object.getPrototypeOf(service))) {
            let method = service[name];
            if (method === service.constructor) {
                continue;
            }

            var httpMethod: HttpMethod          = null;
            var path:String                     = null;
            var pathParams:ParamDescription[]   = [];
            var headerParams:ParamDescription[] = [];

            let methodKeys: any[] = Reflect.getMetadataKeys(method);
            methodKeys.forEach((k)=>{

                // determine the http method
                if ( k.indexOf(namings.httpMethodMarker) === 0 ) {
                    httpMethod = this.HttpMethodMap[k];
                }

                // determine the path
                if ( k === namings.path ) {
                    let rawPath = Reflect.getMetadata(k, method);
                    path = rawPath ? rawPath : null;
                }
            })


            // evaluate PathParams
            pathParams = Reflect.getMetadata(namings.pathParam, service, name) || [];


            // evaluate HeaderParams
            headerParams = Reflect.getMetadata(namings.headerParam, service, name) || [];
        
            if ( httpMethod !== null ) {
                var md = new MethodDescriptor(name, httpMethod);
                md.path         = path;
                md.pathParams   = pathParams;
                md.headerParams = headerParams;
                methods.push(md);
            }
        }

        return methods;
    }

    traverse(service: Object):RestDescriptor {

        let basePath = this.parseBasePath(service);
        // may be null or /
        this.descriptor.basePath = basePath;

        // only descriptions marked with get, post, put, delete
        let methods:MethodDescriptor[] = this.parseMethodDescriptions(service);
        methods.forEach( (aMethod) => {
            // may have a path,
            // may have parameter - these parameters must be present oin the path
            this.descriptor.addMethod(aMethod);
        });

        return this.descriptor;
    }
}

export class DecoratorParser {

    static parse(service: Object):RestDescriptor {
        let parser = new Parser();
        return parser.traverse(service);
    }
}