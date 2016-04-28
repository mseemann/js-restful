
import 'reflect-metadata';
import * as express from "express";

export class JsRestify {

    static findClassPath(anObject:Object) : string {
        var path = '';
        console.log(anObject);
        let keys: any[] = Reflect.getMetadataKeys(anObject.constructor);
        keys.forEach((k)=>{
            console.log('suche key',k);
            if (k==='jsrestful::Path') {
                path = Reflect.getMetadata(k, anObject.constructor);
            }
        });
        // TODO make sure path starts with /
        return '/'+path;
    }

    static register(app: express.Application, anObject:Object){
        let router = express.Router();

        for (let name of Object.getOwnPropertyNames(Object.getPrototypeOf(anObject))) {

            let method = anObject[name];

            if (method === anObject.constructor) continue;
            console.log(method, name);

            let methodKeys: any[] = Reflect.getMetadataKeys(method);
            methodKeys.forEach((k)=>{
                console.log(k, Reflect.getMetadata(k, method));
                if(k==='jsrestful::GET'){
                    router.get('/:id', (req: express.Request, res: express.Response, next) => {
                        let result = method();
                        console.log( typeof result, name );
                        console.log(Reflect.getMetadata("jsrestful::PathParam", anObject, name));
                        res.json(result);
                    });
                }
            })
        }


        let classPath = this.findClassPath(anObject);
        console.log(`register classPath: ${classPath} at router base path`);
        app.use(classPath, router);
    }
}
