import { ServiceParser } from './decorator-parser';
import {ServiceDescription, ISecurityContext} from './descriptions';
import {PermitAll, Path, GET, RolesAllowed, SecurityContext} from "./decorators";


@PermitAll()
@Path('/')
class TestServiceA {

    @GET()
    x(){}
}

@Path('/')
class TestServiceB {
    @GET()
    x(){}
}

class TestServiceC {

    @GET()
    @RolesAllowed(['user'])
    x(){}
}

class TestServiceD {

    @GET()
    x(@SecurityContext() conext:ISecurityContext){}
}

describe('ServiceDescription', () => {


    it('should need a security context - permitAll at class level', () => {
        let serviceDescription = ServiceParser.parse(new TestServiceA());
        expect(serviceDescription.isSecurityContextUsed()).toBe(true);
    })

    it('should not need a security context', () => {
        let serviceDescription = ServiceParser.parse(new TestServiceB());
        expect(serviceDescription.isSecurityContextUsed()).toBe(false);
    })

    it('should need a security context - RolesAllowed at method level', () => {
        let serviceDescription = ServiceParser.parse(new TestServiceC());
        expect(serviceDescription.isSecurityContextUsed()).toBe(true);
    })

    it('should need a security context - SecurityContextParam', () => {
        let serviceDescription = ServiceParser.parse(new TestServiceD());
        expect(serviceDescription.isSecurityContextUsed()).toBe(true);
    })
})