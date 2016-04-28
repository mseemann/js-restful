/// <reference path="../typings/main.d.ts" />
import 'reflect-metadata';
import * as express from "express";
export declare function Path(path: string): Function;
export declare function GET(): (target: Object, key: string, descriptor: TypedPropertyDescriptor<any>) => TypedPropertyDescriptor<any>;
export declare function PathParam(name: string): (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;
export declare class JsRestify {
    static findClassPath(anObject: Object): string;
    static register(app: express.Application, anObject: Object): void;
}
