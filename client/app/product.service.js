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
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("./product");
var core_1 = require("@angular/core");
require("rxjs/add/operator/toPromise");
var http_1 = require("@angular/http");
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.header = new Headers({ 'Content-Type': 'application/json' });
        this.productsUrl = 'products';
    }
    ProductService.prototype.getProducts = function () {
        return this.http.get(this.productsUrl)
            .toPromise()
            .then(function (response) { return response.json(); }) // rzutowanie na daną klasę
            .catch(this.handleError);
    };
    ProductService.prototype.handleError = function (error) {
        return Promise.reject(error.message || error);
    };
    ProductService.prototype.update = function (product) {
        var url = this.productsUrl + "/update/" + product.id;
        return this.http.post(url, JSON.stringify(product), { headers: this.header })
            .toPromise()
            .then(function () { return product_1.Product; })
            .catch(this.handleError);
    };
    ProductService.prototype.create = function (productName, productQuantity) {
        return this.http
            .post('products/', {
            name: productName,
            quantinity: productQuantity
        }, { headers: this.header })
            .toPromise()
            .then(function (result) { return result.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.delete = function (productId) {
        return this.http.post(this.productsUrl + "/delete/" + productId, { id: productId }, { headers: this.header })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    ProductService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map