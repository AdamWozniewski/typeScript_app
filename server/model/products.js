"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("./product");
var Products = (function () {
    function Products(products) {
        if (products === void 0) { products = []; }
        var _this = this;
        this.listProducts = new Array();
        products.forEach(function (prod) {
            _this.listProducts.push(prod);
        });
    }
    Products.prototype.list = function () {
        return this.listProducts;
    };
    Products.prototype.add = function (productName, productQuantinity) {
        var productids = this.listProducts.map(function (product) { return product.getId(); });
        var productIdMax = Math.max.apply(Math, productids) + 1;
        var product = new product_1.Product(productIdMax, productName, productQuantinity);
        this.listProducts.push(product);
        return this.listProducts;
    };
    Products.prototype.fetch = function (productId) {
        return productId && this.listProducts.filter(function (product) { return product.getId() === productId; }).shift();
    };
    Products.prototype.find = function (productQuery) {
        var productId = parseInt(productQuery);
        console.log(productId, productQuery);
        var productQueryString = productQuery;
        productQueryString = productQueryString.toLocaleLowerCase();
        return this.listProducts.filter(function (product) { return product.getId() === productId || product.getName().toLocaleLowerCase() === productQueryString; }).shift();
    };
    Products.prototype.delete = function (productId) {
        var deleted = false;
        this.listProducts = this.listProducts.filter(function (prod) {
            deleted = deleted || prod.getId() !== productId;
            return prod.getId() !== productId;
        });
        return deleted;
        // return this.listProducts.filter((product: Product) => product.getId() === productId).shift();
    };
    return Products;
}());
exports.Products = Products;
//# sourceMappingURL=products.js.map