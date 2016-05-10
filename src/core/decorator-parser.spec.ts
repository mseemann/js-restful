
import { ServiceParser } from './decorator-parser';
import { ServiceDescription, HttpMethod } from './descriptions';
import { BookService } from './test-classes.spec';


describe('rest-serviceDescription-parser', () => {

    let bookService = new BookService();
    let serviceDescription = ServiceParser.parse(bookService);

    it('should create a ServiceDescription from the service', () => {
        expect(serviceDescription).not.toBeNull();
    })

    it('should have a base path', () => {
       expect(serviceDescription.basePath).toBe('/books');
    })

    it('should have a permitAll decorator', () => {
        expect(serviceDescription.permitAll).toBe(true);
    })

    it('should have 6 methods decorated with a httpMethod', () => {
        expect(serviceDescription.methods.length).toBe(6);
    })

    describe('allBooks method', () => {
        let method = serviceDescription.getMethodDescriptorForMethodName('allBooks');

        it('should be a GET method', () => {
           expect(method.httpMethod).toBe(HttpMethod.GET);
        })

        it('should have no Path', () => {
            expect(method.path).toBeNull();
        })

        it('should have two roles that are permitted to access the method', () => {
            expect(method.rolesAllowed.length).toBe(2);
            expect(method.rolesAllowed).toContain('admin');
            expect(method.rolesAllowed).toContain('user');
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
        let method = serviceDescription.getMethodDescriptorForMethodName('deleteBook');

        it('should be a DELETE method', () => {
            expect(method.httpMethod).toBe(HttpMethod.DELETE);
        })

        it('should have a path with id', () => {
            expect(method.path).toBe('/:id');
        })

        it('should have one PathParams', () => {
            expect(method.pathParams.length).toBe(1);
            expect(method.pathParams).toContain({paramName: 'id', index: 0});
        })

        it('should have one QueryParams', () => {
            expect(method.queryParams.length).toBe(1);
            expect(method.queryParams).toContain({paramName: 'time', index: 1});
        })

        it('should have no HeaderParams', () => {
            expect(method.headerParams.length).toBe(0);
        })

        it('just for fun the method resturns true', () => {
            expect(bookService[method.methodName]()).toEqual(true);
        })
    });

    describe('updateBook methods', () => {
        let method = serviceDescription.getMethodDescriptorForMethodName('updateBook');

        it('should be a PUT method', () => {
            expect(method.httpMethod).toBe(HttpMethod.PUT);
        })

        it('should have a path with id and name', () => {
            expect(method.path).toBe('/:id/:name');
        })

        it('should have two PathParams', () => {
            expect(method.pathParams.length).toBe(2);
            expect(method.pathParams).toContain({paramName: 'id', index: 0});
            expect(method.pathParams).toContain({paramName: 'name', index: 1});
        })

        it('should have no HeaderParams', () => {
            expect(method.headerParams.length).toBe(0);
        })

        it('just for fun the method resturns what is provided', () => {
            expect(bookService[method.methodName](1, 'name')).toEqual({'id':1, 'name':'name'});
        })
    });

    describe('createBook method', () => {
        let method = serviceDescription.getMethodDescriptorForMethodName('createBook');

        it('should be a POST method', () => {
            expect(method.httpMethod).toBe(HttpMethod.POST);
        })

        it('should be permitted for all', () => {
            expect(method.permitAll).toBe(true);
        })

        it('should have a path with name', () => {
            expect(method.path).toBe('/:name');
        })

        it('should have one PathParams', () => {
            expect(method.pathParams.length).toBe(1);
            expect(method.pathParams).toContain({paramName: 'name', index: 0});
        })

        it('should have one HeaderParams', () => {
            expect(method.headerParams.length).toBe(1);
            expect(method.headerParams).toContain({paramName: 'token', index: 1});
        })

        it('just for fun the method resturns what is provided', () => {
            expect(bookService[method.methodName]('name')).toEqual({'id':1, 'name':'name'});
        })
    })

    describe('contextTest method', () => {
        let method = serviceDescription.getMethodDescriptorForMethodName('contextTest');

        it('should have one ContextParam', () => {
            expect(method.contextParams.length).toBe(2);
            expect(method.contextParams).toContain({paramName: 'HttpRequest', index: 0});
            expect(method.contextParams).toContain({paramName: 'HttpResponse', index: 1});
        })
    })

    describe('security context test method', () => {
        let method = serviceDescription.getMethodDescriptorForMethodName('securityContextTest');

        it('should have one SecurityContextParam', () => {
            expect(method.securityContextParam).toEqual({paramName:'SecurityContext', index: 0});
        })
    })
});