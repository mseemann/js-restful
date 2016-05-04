
import { GET, POST, PUT, DELETE, Path, PathParam, HeaderParam, QueryParam, Context } from './decorators';
import { ContextTypes } from './descriptions';

export class Book {
    id:number;
    name: string;
}

@Path('/books')
export class BookService {

    testProperty:number = 2;

    unDecoratedMethod(){}

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
    deleteBook(@PathParam('id') id:number, @QueryParam('time') time:number): boolean{
        return true;
    }

    @GET()
    @Path('/contexttest')
    contextTest(@Context(ContextTypes.HttpRequest) req:any, @Context(ContextTypes.HttpResponse) res:any){
        return true;
    }
}