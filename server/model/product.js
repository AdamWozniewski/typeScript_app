"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Product = (function () {
    function Product(id, name, quantinity) {
        if (quantinity === void 0) { quantinity = 0; }
        this.id = id;
        this.name = name;
        this.quantinity = quantinity;
    }
    Product.prototype.updateQuantinity = function (newQuantinity) {
        this.quantinity = newQuantinity;
    };
    Product.prototype.updateName = function (newName) {
        this.name = newName;
    };
    Product.prototype.addProducts = function (addedQuantinity) {
        this.quantinity += addedQuantinity;
    };
    Product.prototype.substractProducts = function (substractedQuantinity) {
        this.quantinity -= substractedQuantinity;
    };
    Product.prototype.getId = function () {
        return this.id;
    };
    Product.prototype.getName = function () {
        return this.name;
    };
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=product.js.map