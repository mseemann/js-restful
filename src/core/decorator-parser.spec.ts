
import { DecoratorParser } from './decorator-parser';
import { RestDescriptor, HttpMethod } from './descriptor';
import { BookService } from './test-classes';


describe('rest-descriptor-parser', () => {

    var bookService:BookService = new BookService();
    var descriptor:RestDescriptor = DecoratorParser.parse(bookService);

    it('should create a RestDescriptor from the service', () => {
        expect(descriptor).not.toBeNull();
    })

    it('should have a base path', () => {
       expect(descriptor.basePath).toBe('/books');
    })

    it('should have 4 methods decorated with a httpMethod', () => {
        expect(descriptor.methods.length).toBe(4);
    })

    describe('allBooks method', () => {
        let method = descriptor.getMethodDescriptorForMethodName('allBooks');

        it('should be a GET method', () => {
           expect(method.httpMethod).toBe(HttpMethod.GET);
        })

        it('should have no Path', () => {
            expect(method.path).toBeNull();
        })

        it('should have no PathParams', () => {
            expect(method.pathParams.length).toBe(0);
        })

        it('should have no HeaderParams', () => {
            expect(method.headerParams.length).toBe(0);
        })

        it('just for fun the method resturns an empty arry', () => {
            expect(bookService[method.methodName]()).toEqual([]);
        })
    });

    describe('deleteBook method', () => {
        let method = descriptor.getMethodDescriptorForMethodName('deleteBook');

        it('should be a DELETE method', () => {
            expect(method.httpMethod).toBe(HttpMethod.DELETE);
        })

        it('should have a path with id', () => {
            expect(method.path).toBe('/:id');
        })

        it('should have one PathParams', () => {
            expect(method.pathParams.length).toBe(1);
            expect(method.pathParams).toContain({pathParam: 'id', index: 0});
        })

        it('should have no HeaderParams', () => {
            expect(method.headerParams.length).toBe(0);
        })

        it('just for fun the method resturns true', () => {
            expect(bookService[method.methodName]()).toEqual(true);
        })
    });

    describe('updateBook methods', () => {
        let method = descriptor.getMethodDescriptorForMethodName('updateBook');

        it('should be a PUT method', () => {
            expect(method.httpMethod).toBe(HttpMethod.PUT);
        })

        it('should have a path with id and name', () => {
            expect(method.path).toBe('/:id/:name');
        })

        it('should have two PathParams', () => {
            expect(method.pathParams.length).toBe(2);
            expect(method.pathParams).toContain({pathParam: 'id', index: 0});
            expect(method.pathParams).toContain({pathParam: 'name', index: 1});
        })

        it('should have no HeaderParams', () => {
            expect(method.headerParams.length).toBe(0);
        })

        it('just for fun the method resturns what is provided', () => {
            expect(bookService[method.methodName](1, 'name')).toEqual({'id':1, 'name':'name'});
        })
    });

    describe('createBook method', () => {
        let method = descriptor.getMethodDescriptorForMethodName('createBook');

        it('should be a POST method', () => {
            expect(method.httpMethod).toBe(HttpMethod.POST);
        })

        it('should have a path with name', () => {
            expect(method.path).toBe('/:name');
        })

        it('should have one PathParams', () => {
            expect(method.pathParams.length).toBe(1);
            expect(method.pathParams).toContain({pathParam: 'name', index: 0});
        })

        it('should have one HeaderParams', () => {
            expect(method.headerParams.length).toBe(1);
            expect(method.headerParams).toContain({pathParam: 'token', index: 1});
        })

        it('just for fun the method resturns what is provided', () => {
            expect(bookService[method.methodName]('name')).toEqual({'id':1, 'name':'name'});
        })
    })
});