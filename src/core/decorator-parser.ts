import 'reflect-metadata';
import {RestDescriptor, MethodDescriptor} from "./descriptor";
import * as namings from './namings';

class Parser {

    descriptor:RestDescriptor = new RestDescriptor();

    constructor(){
    }

    parseBasePath(service: any) : string | void {
        console.log(service);
        console.log(Reflect.getMetadataKeys(service.constructor));
        let path =  Reflect.getMetadata(namings.buildFullName((namings.path)), service.constructor);
        console.log(path);
        return path ? path : null;
    }

    parseMethodDescriptions(service): MethodDescriptor[] {

        return [];
    }

    traverse(service: Object):RestDescriptor {

        let basePath = this.parseBasePath(service);
        // may be null or /
        this.descriptor.basePath = basePath;

        // only descriptions marked with get, post, put, delete
        let methods = this.parseMethodDescriptions(service);
        for (var aMethod in methods) {
            // may have a path,
            // may have parameter - these parameters must be present oin the path
            this.descriptor.addMethod(aMethod);
        }

        return this.descriptor;
    }
}

export class DecoratorParser {

    static parse(service: Object):RestDescriptor {
        let parser = new Parser();
        return parser.traverse(service);
    }
}