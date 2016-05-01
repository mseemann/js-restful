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

            expect(pathParams).toContain({pathParam:'id', index: 0});
        })

        it('should have two PathParams at the method updateBook', () => {
            let pathParams: ParamDescription[] = Reflect.getMetadata(namings.pathParam, bookService, 'updateBook');

            expect(pathParams.length).toBe(2);

            expect(pathParams).toContain({pathParam:'id', index: 0});
            expect(pathParams).toContain({pathParam:'name', index: 1});
        })
    });

    describe('headerParam decorator', () => {
        it('should have one HeaderParam at the method createBook', () => {
            let headerParams: ParamDescription[] = Reflect.getMetadata(namings.headerParam, bookService, 'createBook');

            expect(headerParams.length).toBe(1);

            expect(headerParams).toContain({pathParam:'token', index: 1});
        })
    })

    describe('queryParam decorator', () => {
        it('should have one QueryParam at the method deleteBook', () => {
            let queryParams: ParamDescription[] = Reflect.getMetadata(namings.queryParam, bookService, 'deleteBook');

            expect(queryParams.length).toBe(1);

            expect(queryParams).toContain({pathParam:'time', index: 1});
        })
    })

});