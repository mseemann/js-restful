# js-restful
Create a RESTful service with ES7 decorators for your node.js application.

[![CI Status](http://img.shields.io/travis/mseemann/js-restful.svg?style=flat)](https://travis-ci.org/mseemann/js-restful)
[![npm version](https://badge.fury.io/js/js-restful.svg)](http://badge.fury.io/js/js-restful)
[![Downloads](http://img.shields.io/npm/dm/js-restful.svg)](https://npmjs.org/package/js-restful)
[![Coverage Status](https://coveralls.io/repos/github/mseemann/js-restful/badge.svg?branch=master)](https://coveralls.io/github/mseemann/js-restful?branch=master)
[![Code Climate](https://codeclimate.com/github/mseemann/js-restful/badges/gpa.svg)](https://codeclimate.com/github/mseemann/js-restful)

**Installation**
```bash
npm install js-restful --save
```

**Usage**
Extend your node js service class with decorators (this is TypeScript with decorators!):

```typescript
import { GET, POST, PUT, DELETE, Path, PathParam, HeaderParam } from 'js-restful';

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
    deleteBook(@PathParam('id') id:number): boolean {
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
      "headerParams":[]
    },
    {
      "methodName":"createBook",
      "httpMethod":1,
      "path":"/:name",
      "pathParams":[{"pathParam":"name","index":0}],
      "headerParams":[{"pathParam":"token","index":1}]
    },
    {
      "methodName":"updateBook",
      "httpMethod":2,
      "path":"/:id/:name",
      "pathParams":[{"pathParam":"name","index":1},{"pathParam":"id","index":0}],
      "headerParams":[]
    },
    {
      "methodName":"deleteBook",
      "httpMethod":3,
      "path":"/:id",
      "pathParams":[{"pathParam":"id","index":0}],
      "headerParams":[]
    }
  ]
}
```

Ok! But what can I do with this. Have a look at the github project [js-restful-express](https://github.com/mseemann/js-restful-express).

This is a base project that different implementations can use to integrate this information in a concrete node js framework.