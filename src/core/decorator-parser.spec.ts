import { DecoratorParser } from './decorator-parser';
import { BookService } from './../../test/test-classes';

describe('rest-descriptor-parser', () => {

    const bookService = new BookService();

    it('should create a RestDescriptor from the service', () => {
        let descriptor = DecoratorParser.parse(bookService);
        expect(descriptor).not.toBeNull();
    })

});