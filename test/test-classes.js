"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var rest_decorators_1 = require('./../src/core/rest-decorators');
var Book = (function () {
    function Book() {
    }
    return Book;
}());
exports.Book = Book;
var BookService = (function () {
    function BookService() {
    }
    BookService.prototype.allBooks = function () {
        return [];
    };
    BookService.prototype.createBook = function (name, token) {
        return { id: 1, name: name };
    };
    BookService.prototype.updateBook = function (id, name) {
        return { id: id, name: name };
    };
    BookService.prototype.deleteBook = function (id) {
        return true;
    };
    __decorate([
        rest_decorators_1.GET(), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Array)
    ], BookService.prototype, "allBooks", null);
    __decorate([
        rest_decorators_1.Path('/:name'),
        rest_decorators_1.POST(),
        __param(0, rest_decorators_1.PathParam('name')),
        __param(1, rest_decorators_1.HeaderParam('token')), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [String, String]), 
        __metadata('design:returntype', Book)
    ], BookService.prototype, "createBook", null);
    __decorate([
        rest_decorators_1.Path('/:id/:name'),
        rest_decorators_1.PUT(),
        __param(0, rest_decorators_1.PathParam('id')),
        __param(1, rest_decorators_1.PathParam('name')), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number, String]), 
        __metadata('design:returntype', Book)
    ], BookService.prototype, "updateBook", null);
    __decorate([
        rest_decorators_1.Path('/:id'),
        rest_decorators_1.DELETE(),
        __param(0, rest_decorators_1.PathParam('id')), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number]), 
        __metadata('design:returntype', Boolean)
    ], BookService.prototype, "deleteBook", null);
    BookService = __decorate([
        rest_decorators_1.Path('/books'), 
        __metadata('design:paramtypes', [])
    ], BookService);
    return BookService;
}());
exports.BookService = BookService;
//# sourceMappingURL=test-classes.js.map