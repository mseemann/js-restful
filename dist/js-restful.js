/// <reference path='./../typings/main.d.ts' />
"use strict";
require('reflect-metadata');
var express = require("express");
function Path(path) {
    return function (target) {
        Reflect.defineMetadata('jsrestful::Path', path, target);
    };
}
exports.Path = Path;
function GET() {
    return function (target, key, descriptor) {
        // var originalMethod = descriptor.value;
        // descriptor.value = function (...args:any[]) {
        //   var a = args.map(a => JSON.stringify(a)).join();
        //   // note usage of originalMethod here
        //   var result = originalMethod.apply(this, args);
        //   var r = JSON.stringify(result);
        //   console.log(`Call: ${key}(${a}) => ${r}`);
        //   return result;
        // }
        Reflect.defineMetadata('jsrestful::GET', true, descriptor.value);
        return descriptor;
    };
}
exports.GET = GET;
function PathParam(name) {
    return function (target, propertyKey, parameterIndex) {
        var existingPathParams = Reflect.getOwnMetadata('jsrestful::PathParam', target, propertyKey) || [];
        existingPathParams.push({ pathParam: name, index: parameterIndex });
        Reflect.defineMetadata('jsrestful::PathParam', existingPathParams, target, propertyKey);
    };
}
exports.PathParam = PathParam;
var JsRestify = (function () {
    function JsRestify() {
    }
    JsRestify.findClassPath = function (anObject) {
        var path = '';
        console.log(anObject);
        var keys = Reflect.getMetadataKeys(anObject.constructor);
        keys.forEach(function (k) {
            console.log('suche key', k);
            if (k === 'jsrestful::Path') {
                path = Reflect.getMetadata(k, anObject.constructor);
            }
        });
        // TODO make sure path starts with /
        return '/' + path;
    };
    JsRestify.register = function (app, anObject) {
        var router = express.Router();
        var _loop_1 = function(name_1) {
            var method = anObject[name_1];
            if (method === anObject.constructor)
                return "continue";
            console.log(method, name_1);
            var methodKeys = Reflect.getMetadataKeys(method);
            methodKeys.forEach(function (k) {
                console.log(k, Reflect.getMetadata(k, method));
                if (k === 'jsrestful::GET') {
                    router.get('/:id', function (req, res, next) {
                        var result = method();
                        console.log(typeof result, name_1);
                        console.log(Reflect.getMetadata("jsrestful::PathParam", anObject, name_1));
                        res.json(result);
                    });
                }
            });
        };
        for (var _i = 0, _a = Object.getOwnPropertyNames(Object.getPrototypeOf(anObject)); _i < _a.length; _i++) {
            var name_1 = _a[_i];
            var state_1 = _loop_1(name_1);
            if (state_1 === "continue") continue;
        }
        var classPath = this.findClassPath(anObject);
        console.log("register classPath: " + classPath + " at router base path");
        app.use(classPath, router);
    };
    return JsRestify;
}());
exports.JsRestify = JsRestify;
