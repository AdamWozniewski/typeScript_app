"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_1 = require("../model/product");
var products_1 = require("../model/products");
var ProductsRoutes = (function () {
    function ProductsRoutes() {
        // this.productList.push(new Product(1, 'ABC', 1));
        this.productList = new products_1.Products([
            new product_1.Product(1, 'ABC', 1),
            new product_1.Product(2, 'ABCEFG', 1),
        ]);
    }
    ProductsRoutes.routes = function (nameOfHome) {
        var router = express_1.Router();
        var productsRoute = new ProductsRoutes();
        router.get(nameOfHome, productsRoute.index.bind(productsRoute));
        router.post(nameOfHome + "/", productsRoute.create.bind(productsRoute));
        router.get(nameOfHome + "/:product", productsRoute.find.bind(productsRoute));
        return router; // zwraca nazwę strony w postaci obiektu express.Router()
    };
    ProductsRoutes.prototype.index = function (req, res) {
        // res.send("strona produkty")
        res.json(this.productList.list());
    };
    ProductsRoutes.prototype.create = function (req, res) {
        var prodName = req.body.product_name;
        var prodQuantinity = parseInt(req.body.product_quantinity) || 0;
        if (!prodName) {
            res.status(500).send("Nie ma takiego produktu");
            return false;
        }
        // tu
        res.json(this.productList.add(prodName, prodQuantinity));
    };
    //zminaa
    ProductsRoutes.prototype.find = function (req, res) {
        var prodQuery = req.params.product;
        var product = this.productList.find(prodQuery);
        if (!prodQuery) {
            res.status(404).send("Nie ma takiego produktu");
            return false;
        }
        res.json(product);
    };
    return ProductsRoutes;
}());
exports.ProductsRoutes = ProductsRoutes;
//# sourceMappingURL=products.js.map