import { ParamDescription } from './decorators';
import * as namings from './namings';
import { BookService } from './test-classes';
import { DecoratorParser } from './decorator-parser';

describe('rest-decorator', () => {

    const bookService = new BookService();
    const descriptor = DecoratorParser.parse(bookService)

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

            console.log('y----y');
            console.log(bookService);
            console.log(Reflect.getMetadataKeys(bookService.constructor));
            console.log(Reflect.getMetadataKeys(bookService.allBooks));
            console.log('y----Xy');

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
            let pathParams: ParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.pathParam), bookService, 'deleteBook');
            expect(pathParams.length).toBe(1);

            expect(pathParams).toContain({pathParam:'id', index: 0});
        })

        it('should have two PathParams at the method updateBook', () => {
            let pathParams: ParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.pathParam), bookService, 'updateBook');

            expect(pathParams.length).toBe(2);

            expect(pathParams).toContain({pathParam:'id', index: 0});
            expect(pathParams).toContain({pathParam:'name', index: 1});
        })
    });

    describe('headerParam decorator', () => {
        it('should have one HeaderParam at the method createBook', () => {
            let headerParams: ParamDescription[] = Reflect.getMetadata(namings.buildFullName(namings.headerParam), bookService, 'createBook');

            expect(headerParams.length).toBe(1);

            expect(headerParams).toContain({pathParam:'token', index: 1});
        })
    })


    describe('RestDescriptor', () => {

        it('should create a RestDescriptor from the service', () => {
            expect(descriptor).not.toBeNull();
        })

        it('should have a base path', () => {
            expect(descriptor.basePath).toBe('/books');
        })
    })

});