"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var product_1 = require("../model/product");
var products_1 = require("../model/products");
var ProductsRoutes = (function () {
    function ProductsRoutes() {
        this.productList = new products_1.Products([
            new product_1.Product(1, 'ABCd', 12),
            new product_1.Product(2, 'ABCEFGh', 12),
        ]);
    }
    ProductsRoutes.routes = function (nameOfHome) {
        var router = express_1.Router();
        var productsRoute = new ProductsRoutes();
        router.get(nameOfHome, productsRoute.index.bind(productsRoute));
        router.post(nameOfHome + "/", productsRoute.create.bind(productsRoute));
        router.get(nameOfHome + "/:product", productsRoute.find.bind(productsRoute));
        router.post(nameOfHome + "/delete/:product", productsRoute.delete.bind(productsRoute));
        router.delete(nameOfHome + "/delete/:product", productsRoute.delete.bind(productsRoute));
        router.post(nameOfHome + "/update/:product", productsRoute.update.bind(productsRoute));
        router.put(nameOfHome + "/update/:product", productsRoute.update.bind(productsRoute));
        return router; // zwraca nazwę strony w postaci obiektu express.Router()
    };
    ProductsRoutes.prototype.index = function (req, res) {
        res.json(this.productList.list());
    };
    ProductsRoutes.prototype.create = function (req, res) {
        var productName = req.body.name || 'PUSTE';
        var productQuantity = parseInt(req.body.quantinity) || 0;
        if (!productName) {
            res.status(500).send('Product name not found');
            return;
        }
        res.json(this.productList.add(productName, productQuantity));
    };
    ProductsRoutes.prototype.delete = function (req, res) {
        var prodId = parseInt(req.params.id);
        var productWasDeleted = this.productList.delete(prodId);
        if (!productWasDeleted) {
            res.status(404).send("Nie ma takiego produktu");
            return false;
        }
        else {
            res.json({ success: true });
        }
    };
    ProductsRoutes.prototype.update = function (req, res) {
        var prodId = parseInt(req.params.product);
        var product = this.productList.fetch(prodId);
        var productName = req.body.name; // przekazana wartosc dla PUT
        var productQuantity = parseInt(req.body.quantinity, 10); // przekazana wartosc dla PUT
        if (!product) {
            res.status(404).send("Nie ma takiego produktu");
            return false;
        }
        if (productName !== undefined) {
            product.updateName(productName);
        }
        if (productQuantity !== undefined) {
            product.updateQuantinity(productQuantity);
        }
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