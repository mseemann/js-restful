# js-restful
Create a RESTful service with ES6 decorators for your node.js application.

[![CI Status](http://img.shields.io/travis/mseemann/js-restful.svg?style=flat)](https://travis-ci.org/mseemann/js-restful)
[![npm version](https://badge.fury.io/js/js-restful.svg)](http://badge.fury.io/js/js-restful)
[![Downloads](http://img.shields.io/npm/dm/js-restful.svg)](https://npmjs.org/package/js-restful)
[![Coverage Status](https://coveralls.io/repos/github/mseemann/js-restful/badge.svg?branch=master)](https://coveralls.io/github/mseemann/js-restful?branch=master)

**Status**
In development. Not ready for use!

**Installation**
```bash
npm install js-restful --save
```

**Usage**
Extend your node js service class with decorators:

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

**I Need Help!**
The coverage bage shows not the right coverage.
Because of the preprocessing used libs (for example
the source for reflect-metadata) is included in
the measurements. For sure this is wrong.
If anybody knows how to fix it - your are welcome!
