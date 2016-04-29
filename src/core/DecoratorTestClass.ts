import {GET, POST, PUT, DELETE, Path, PathParam, HeaderParam } from './rest-decorators';

@Path('/')
export class Test{

    @GET()
    mGet(){
    }

    @Path('/post')
    @POST()
    mPost(@PathParam('id') id:number, @PathParam('name') name:string, @HeaderParam('token') token:string){
    }

    @Path('/:id')
    @PUT()
    mPut(@PathParam('id') id:number){
    }

    @DELETE()
    mDelete(){
    }
}