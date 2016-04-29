
import * as http from './rest-decorators';
import * as namings from './namings';

class Test{

    @http.GET()
    mGet(){
    }

    @http.POST()
    mPost(){
    }

    @http.PUT()
    mPut(){
    }

    @http.DELETE()
    mDelete(){
    }
}

describe('rest-decorator', () => {

    describe('http method decorator', () => {

        const test = new Test();

        it('should have a decorator GET on method mGet', () => {
            expect(Reflect.getMetadata(namings.buildFullName(namings.getMethod), test.mGet)).toBe(true);
        });

        it('should have a decorator POST on method mPost', () => {
            expect(Reflect.getMetadata(namings.buildFullName(namings.postMethod), test.mPost)).toBe(true);
        });

        it('should have a decorator PUT on method mPut', () => {
            expect(Reflect.getMetadata(namings.buildFullName(namings.putMethod), test.mPut)).toBe(true);
        });

        it('should have a decorator DELETE on method mDeletet', () => {
            expect(Reflect.getMetadata(namings.buildFullName(namings.deleteMethod), test.mDelete)).toBe(true);
        });
    });
});