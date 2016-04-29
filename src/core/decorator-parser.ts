import {RestDescriptor} from "./descriptor";

export class DecoratorParser {

    static parse(service: Object):RestDescriptor {
        var descriptor = new RestDescriptor();

        let basePath = this.getBasePath(service);
        descriptor.setBasePath(basePath);


        return descriptor;
    }
}