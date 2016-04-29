import { PathParamDescription } from './rest-decorators';
import * as namings from './namings';
import getOwnPropertyDescriptor = Reflect.getOwnPropertyDescriptor;
import { BookService } from './test-classes';



describe('rest-decorator', () => {

    const bookService = new BookService();

    describe('http method decorator', () => {

        it('should have a decorator GET on method allBooks', () => {
            expect(Reflect.getMetadata(namings.buildFullName(namings.getMethod), bookService.allBooks)).toBe(true);
        });

        it('should have a decorator POST on method createBook', () => {
            expect(Reflect.getMetadata(namings.buildFullName(namings.postMethod), bookService.createBook)).toBe(true);
        });

        it('should have a decorator PUT on method updateBook', () => {
            expect(Reflect.getMetadata(namings.buildFullName(namings.putMethod), bookService.updateBook)).toBe(true);
        });

        it('should have a decorator DELETE on method deleteBook', () => {
            expect(Reflect.getMetadata(namings.buildFullName(namings.deleteMethod), bookService.deleteBook)).toBe(true);
        });
    });

    describe('path decorator', () => {

        it('should have a Path decorator at the class', () => {
            expect(Reflect.getMetadata(namings.buildFullName((namings.path)), bookService.constructor)).toBe('/books');
        })

        it('should have a Path decorator at method createBook', () => {
            expect(Reflect.getMetadata(namings.buildFullName((namings.path)), bookService.createBook)).toBe('/:name');
        })

        it('should have a Path decorator at method deleteBook', () => {
            expect(Reflect.getMetadata(namings.buildFullName((namings.path)), bookService.deleteBook)).toBe('/:id');
        })
    });

    describe('pathParam decorator', () => {

        it('should have a PathParam decorator at the method deleteBook for Parameter id with index 0', () => {
            let pathParams: PathParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.pathParam), bookService, 'deleteBook');
            expect(pathParams.length).toBe(1);

            expect(pathParams).toContain({pathParam:'id', index: 0});
        })

        it('should have two PathParams at the method updateBook', () => {
            let pathParams: PathParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.pathParam), bookService, 'updateBook');

            expect(pathParams.length).toBe(2);

            expect(pathParams).toContain({pathParam:'id', index: 0});
            expect(pathParams).toContain({pathParam:'name', index: 1});
        })
    });

    describe('headerParam decorator', () => {
        it('should have one HeaderParam at the method createBook', () => {
            let headerParams: PathParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.headerParam), bookService, 'createBook');

            expect(headerParams.length).toBe(1);

            expect(headerParams).toContain({pathParam:'token', index: 1});
        })
    })
});