import 'reflect-metadata';
import { DecoratorParser } from './decorator-parser';
import { BookService } from './../../test/test-classes';
import { RestDescriptor } from './descriptor';

describe('rest-descriptor-parser', () => {

    const bookService = new BookService();

    var descriptor:RestDescriptor = null;

    beforeEach( () => descriptor = DecoratorParser.parse(bookService));

    it('should create a RestDescriptor from the service', () => {
        expect(descriptor).not.toBeNull();
    })

    it('should have a base path', () => {
        console.log('----');
        console.log(bookService);
        console.log(Reflect.getMetadataKeys(bookService.constructor));
        console.log('----X');

        //expect(descriptor.basePath).toBe('/books');
    })

});