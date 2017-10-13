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
var core_1 = require("@angular/core");
var product_service_1 = require("./product.service");
var AppComponent = (function () {
    function AppComponent(productService) {
        this.productService = productService;
        this.products_list = [];
    }
    AppComponent.prototype.getProducts = function () {
        var _this = this;
        this.productService.getProducts().then(function (response) {
            return _this.products_list = response;
        });
    };
    AppComponent.prototype.onSelect = function (product) {
        console.log(product);
        this.selectedProduct = product;
    };
    AppComponent.prototype.save = function () {
        var _this = this;
        this.productService.update(this.selectedProduct).then(function () { return _this.getProducts(); });
    };
    AppComponent.prototype.ngOnInit = function () {
        this.getProducts();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "<h1>Products</h1>\n            <ul class=\"products\">\n                <li *ngFor=\"let product of products_list\" (click)=\"onSelect(product)\" [class.selectedsss]=\"product===selectedProduct\">\n                    <span class=\"quantity\">{{product.quantinity}}</span>\n                    {{product.name}}\n                </li>\n            </ul>\n            <div *ngIf=\"selectedProduct\">\n                <h2>{{selectedProduct.name}} - {{selectedProduct.quantinity}}</h2>\n\n                <div>\n                    <label>name:</label>\n                    <input [(ngModel)]=\"selectedProduct.name\" placeholder=\"name\">\n\n                    <label>quantity:</label>\n                    <input [(ngModel)]=\"selectedProduct.quantinity\" placeholder=\"quantity\">\n                    <button (click)=\"save()\" >Zapisz</button>\n                </div>\n            </div>\n    ",
            styles: ["\n        .selected {\n            background: #CFD8DC !important;\n        }\n        .products {\n            margin: 0 0 2em 0;\n            list-style-type: none;\n            padding: 0;\n            width: 15em;\n        }\n        .products li {\n            cursor: pointer;\n            position: relative;\n            left: 0;\n            background-color:#EEE;\n            margin: .5em;\n            padding: .3em 0;\n            height: 1.6em;\n            border-radius: 4px;\n        }\n        .products li.selected:hover {\n            background-color:#BBD8DC !important;\n            color: #fff;\n        }\n        .products li:hover {\n            color: #607d8b;\n            background-color:#DDD;\n            left: .1em;\n        }\n        .products .quantity {\n            display: inline-block;\n            font-size: small;\n        }\n    "],
            providers: [product_service_1.ProductService]
        }),
        __metadata("design:paramtypes", [product_service_1.ProductService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map