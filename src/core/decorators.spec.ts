import {ParamDescription, HttpMethod} from './descriptions';
import * as namings from './namings';
import { BookService } from './test-classes.spec';

describe('rest-decorator', () => {

    const bookService = new BookService();

    describe('http method decorator', () => {

        it('should have a decorator GET on method allBooks', () => {
            expect(Reflect.getMetadata(namings.httpMethodMarker, bookService.allBooks)).toBe(HttpMethod.GET);
        });

        it('should have a decorator POST on method createBook', () => {
            expect(Reflect.getMetadata(namings.httpMethodMarker, bookService.createBook)).toBe(HttpMethod.POST);
        });

        it('should have a decorator PUT on method updateBook', () => {
            expect(Reflect.getMetadata(namings.httpMethodMarker, bookService.updateBook)).toBe(HttpMethod.PUT);
        });

        it('should have a decorator DELETE on method deleteBook', () => {
            expect(Reflect.getMetadata(namings.httpMethodMarker, bookService.deleteBook)).toBe(HttpMethod.DELETE);
        });
    });

    describe('path decorator', () => {

        it('should have a Path decorator at the class', () => {
            expect(Reflect.getMetadata(namings.path, bookService.constructor)).toBe('/books');
        })

        it('should have a Path decorator at method createBook', () => {
            expect(Reflect.getMetadata(namings.path, bookService.createBook)).toBe('/:name');
        })

        it('should have a Path decorator at method deleteBook', () => {
            expect(Reflect.getMetadata(namings.path, bookService.deleteBook)).toBe('/:id');
        })
    });

    describe('pathParam decorator', () => {

        it('should have a PathParam decorator at the method deleteBook for Parameter id with index 0', () => {
            let pathParams: ParamDescription[] = Reflect.getMetadata(namings.pathParam, bookService, 'deleteBook');
            expect(pathParams.length).toBe(1);

            expect(pathParams).toContain({paramName:'id', index: 0});
        })

        it('should have two PathParams at the method updateBook', () => {
            let pathParams: ParamDescription[] = Reflect.getMetadata(namings.pathParam, bookService, 'updateBook');

            expect(pathParams.length).toBe(2);

            expect(pathParams).toContain({paramName:'id', index: 0});
            expect(pathParams).toContain({paramName:'name', index: 1});
        })
    });

    describe('headerParam decorator', () => {
        it('should have one HeaderParam at the method createBook', () => {
            let headerParams: ParamDescription[] = Reflect.getMetadata(namings.headerParam, bookService, 'createBook');

            expect(headerParams.length).toBe(1);

            expect(headerParams).toContain({paramName:'token', index: 1});
        })
    })

    describe('queryParam decorator', () => {
        it('should have one QueryParam at the method deleteBook', () => {
            let queryParams: ParamDescription[] = Reflect.getMetadata(namings.queryParam, bookService, 'deleteBook');

            expect(queryParams.length).toBe(1);

            expect(queryParams).toContain({paramName:'time', index: 1});
        })
    })

    describe('contextParam decorator', () => {
        it('should have two Context-param at the method contextTest', () => {
            let contextParams: ParamDescription[] = Reflect.getMetadata(namings.contextParam, bookService, 'contextTest');

            expect(contextParams.length).toBe(2);

            expect(contextParams).toContain({paramName:'HttpRequest', index: 0});
            expect(contextParams).toContain({paramName:'HttpResponse', index: 1});
        })
    })

    describe('securitycontext parameter', () => {
        it('should have one SecurityContext-param at the method securityContextTest', () => {
            let secContextParams: ParamDescription = Reflect.getMetadata(namings.securityContextParam, bookService, 'securityContextTest');
            expect(secContextParams).toEqual({paramName:'SecurityContext', index: 0});
        })
    })
});