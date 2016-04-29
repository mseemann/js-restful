import { PathParamDescription } from './rest-decorators';
import * as namings from './namings';
import getOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor;
import { Test } from './DecoratorTestClass';



describe('rest-decorator', () => {

    const test = new Test();

    describe('http method decorator', () => {

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

    describe('path decorator', () => {

        it('should have a Path decorator at the class', () => {
            expect(Reflect.getMetadata(namings.buildFullName((namings.path)), test.constructor)).toBe('/');
        })

        it('should have a Path decorator at method mPost', () => {
            expect(Reflect.getMetadata(namings.buildFullName((namings.path)), test.mPost)).toBe('/post');
        })

        it('should have a Path decorator at method mPut', () => {
            expect(Reflect.getMetadata(namings.buildFullName((namings.path)), test.mPut)).toBe('/:id');
        })
    });

    describe('pathParam decorator', () => {

        it('should have a PathParam decorator at the method mPut for Parameter id with index 0', () => {
            let pathParams: PathParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.pathParam), test, 'mPut');
            expect(pathParams.length).toBe(1);

            expect(pathParams).toContain({pathParam:'id', index: 0});
        })

        it('should have two PathParams at the method mPost', () => {
            let pathParams: PathParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.pathParam), test, 'mPost');

            expect(pathParams.length).toBe(2);

            expect(pathParams).toContain({pathParam:'id', index: 0});
            expect(pathParams).toContain({pathParam:'name', index: 1});
        })
    });

    describe('headerParam decorator', () => {
        it('should have one HeaderParam at the method mPost', () => {
            let headerParams: PathParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.headerParam), test, 'mPost');

            expect(headerParams.length).toBe(1);

            expect(headerParams).toContain({pathParam:'token', index: 2});
        })
    })
});