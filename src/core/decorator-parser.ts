import { ServiceDescription, MethodDescription, HttpMethod, ParamDescription } from "./descriptions";
import * as namings from './namings';
import {contextParam} from "./namings";

class Parser {

    serviceDescription:ServiceDescription = new ServiceDescription();

    parseBasePath(service: Object) : string | void {
        let path =  Reflect.getMetadata(namings.path, service.constructor);
        return path ? path : null;
    }

    parsePermitAllClassLevel(service: Object):boolean {
        let permitAll = Reflect.getMetadata(namings.permitAll, service.constructor);
        return permitAll === true ? true : false;
    }

    parseRolesClassLevel(service: Object): string[] {
        let roles = Reflect.getMetadata(namings.rolesAllowed, service.constructor) || [];
        return roles;
    }

    parseMethodDescriptions(service): MethodDescription[] {

        var methods:MethodDescription[] = [];

        for (let name of Object.getOwnPropertyNames(Object.getPrototypeOf(service))) {
            let method = service[name];
            if (method === service.constructor) {
                continue;
            }

            var httpMethod: HttpMethod                  = null;
            var path:String                             = null;
            var pathParams:ParamDescription[]           = [];
            var headerParams:ParamDescription[]         = [];
            var queryParams:ParamDescription[]          = [];
            var contextParams:ParamDescription[]        = [];
            var securityContextParam:ParamDescription   = null;
            var permitAll:boolean                       = false;
            var rolesAllowes: string[]                  = [];

            let methodKeys: any[] = Reflect.getMetadataKeys(method);
            methodKeys.forEach((k)=>{

                // determine the http method
                if ( k === namings.httpMethodMarker) {
                    httpMethod = <HttpMethod>Reflect.getMetadata(k, method);
                }

                // determine the path
                else if ( k === namings.path ) {
                    let rawPath = Reflect.getMetadata(k, method);
                    path = rawPath ? rawPath : null;
                }

                else if ( k === namings.permitAll ) {
                    permitAll = true;
                }

                else if ( k === namings.rolesAllowed ) {
                    rolesAllowes = Reflect.getMetadata(k, method) || [];
                }
            })

            // evaluate PathParams
            pathParams = Reflect.getMetadata(namings.pathParam, service, name) || [];
            
            // evaluate HeaderParams
            headerParams = Reflect.getMetadata(namings.headerParam, service, name) || [];

            // evaluate QueryParams
            queryParams = Reflect.getMetadata(namings.queryParam, service, name) || [];

            // evaluate ContextParams
            contextParams = Reflect.getMetadata(namings.contextParam, service, name) || [];

            // evaluate the security context
            securityContextParam = Reflect.getMetadata(namings.securityContextParam, service, name);


            if ( httpMethod !== null ) {
                var md = new MethodDescription(name, httpMethod);
                md.path                 = path;
                md.pathParams           = pathParams;
                md.headerParams         = headerParams;
                md.queryParams          = queryParams;
                md.contextParams        = contextParams;
                md.securityContextParam = securityContextParam;
                md.permitAll            = permitAll;
                md.rolesAllowed         = rolesAllowes;
                methods.push(md);
            }
        }

        return methods;
    }

    traverse(service: Object):ServiceDescription {

        let basePath = this.parseBasePath(service);
        // may be null or /
        this.serviceDescription.basePath = basePath;
        
        let permitAll = this.parsePermitAllClassLevel(service);
        this.serviceDescription.permitAll = permitAll;
        
        let roles = this.parseRolesClassLevel(service);
        this.serviceDescription.rolesAllowed = roles;

        // only descriptions marked with get, post, put, delete
        let methods:MethodDescription[] = this.parseMethodDescriptions(service);
        methods.forEach( (aMethod) => {
            this.serviceDescription.addMethod(aMethod);
        });

        return this.serviceDescription;
    }
}

export class ServiceParser {

    static parse(service: Object):ServiceDescription {
        let parser = new Parser();
        return parser.traverse(service);
    }
}