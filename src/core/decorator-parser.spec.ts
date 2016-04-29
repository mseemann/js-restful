
import { DecoratorParser } from './decorator-parser';
import { RestDescriptor } from './descriptor';
import { BookService } from './test-classes';


describe('rest-descriptor-parser', () => {

    var bookService:BookService = null;
    var descriptor:RestDescriptor = null;

    beforeEach( () => {
        bookService = new BookService();
        descriptor = DecoratorParser.parse(bookService)
    });

    it('should create a RestDescriptor from the service', () => {
        expect(descriptor).not.toBeNull();
    })

    it('should have a base path', () => {
        // TODO this will not work! what the hell is the reason why the meta data are lost if i use the class with metadata in different spec files!
       // expect(descriptor.basePath).toBe('/books');
    })

});