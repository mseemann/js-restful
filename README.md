# js-restful
Create a RESTful service with ES7 decorators for your node.js application.

[![CI Status](http://img.shields.io/travis/mseemann/js-restful.svg?style=flat)](https://travis-ci.org/mseemann/js-restful)
[![npm version](https://badge.fury.io/js/js-restful.svg)](http://badge.fury.io/js/js-restful)
[![Coverage Status](https://coveralls.io/repos/github/mseemann/js-restful/badge.svg?branch=master)](https://coveralls.io/github/mseemann/js-restful?branch=master)
[![Code Climate](https://codeclimate.com/github/mseemann/js-restful/badges/gpa.svg)](https://codeclimate.com/github/mseemann/js-restful)
[![Issue Count](https://codeclimate.com/github/mseemann/js-restful/badges/issue_count.svg)](https://codeclimate.com/github/mseemann/js-restful)
[![Test Coverage](https://codeclimate.com/github/mseemann/js-restful/badges/coverage.svg)](https://codeclimate.com/github/mseemann/js-restful/coverage)
[![Issue Stats](http://issuestats.com/github/mseemann/js-restful/badge/issue)](http://issuestats.com/github/mseemann/js-restful)


**Installation**
```bash
npm install js-restful --save
```
Make sure you have a shim for es7 reflect. For example core-js or reflect-metadat.

**Usage**
Extend your node js service class with decorators (this is TypeScript with decorators!):

```typescript
import { GET, POST, PUT, DELETE, Path, PathParam, HeaderParam, QueryParam } from 'js-restful';

class Book {
    id:number;
    name: string;
}

@Path('/books')
class BookService {

    @GET()
    allBooks() : Book[]{
       return [];
    }

    @Path('/:name')
    @POST()
    createBook(@PathParam('name') name:string, @HeaderParam('token') token:string) :Book {
        return {id:1, name:name};
    }

    @Path('/:id/:name')
    @PUT()
    updateBook(@PathParam('id') id:number, @PathParam('name') name:string) : Book {
        return {id:id, name:name};
    }

    @Path('/:id')
    @DELETE()
    deleteBook(@PathParam('id') id:number, @QueryParam('time') time:number): boolean {
        return true;
    }
}
```
Later (at runtime) you can use the parser to get back all of these information:

```typescript
import { ServiceDescription, ServiceParser } from 'js-restful';

let serviceDescription = ServiceParser.parse(bookService);

```

The result is a complete description of your Service:

```json
{
  "basePath":"/books",
  "methods":[
    {
      "methodName":"allBooks",
      "httpMethod":0,
      "path":null,
      "pathParams":[],
      "headerParams":[],
      "queryParams":[]
    },
    {
      "methodName":"createBook",
      "httpMethod":1,
      "path":"/:name",
      "pathParams":[{"paramName":"name","index":0}],
      "headerParams":[{"paramName":"token","index":1}],
      "queryParams":[]
    },
    {
      "methodName":"updateBook",
      "httpMethod":2,
      "path":"/:id/:name",
      "pathParams":[{"paramName":"name","index":1},{"paramName":"id","index":0}],
      "headerParams":[],
      "queryParams":[]
    },
    {
      "methodName":"deleteBook",
      "httpMethod":3,
      "path":"/:id",
      "pathParams":[{"paramName":"id","index":0}],
      "headerParams":[],
      "queryParams":[{"paramName":"time","index":1}]
    }
  ]
}
```

Ok! But what can I do with this? Have a look at the github project [js-restful-express](https://github.com/mseemann/js-restful-express).

This is a base project that different implementations can use to integrate this information in a concrete node js framework.
