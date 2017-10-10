"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var index_1 = require("./routes/index");
var products_1 = require("./routes/products");
var path = require("path");
var Server = (function () {
    function Server() {
        this.app = express();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.setRoutes();
        this.setStaticRoutes();
    }
    Server.prototype.setRoutes = function () {
        var router = express.Router();
        router.use(index_1.IndexRoute.routes('/'));
        router.use(products_1.ProductsRoutes.routes('/products'));
        this.app.use(router);
    };
    Server.prototype.setStaticRoutes = function () {
        this.app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));
        this.app.use(express.static(path.join(__dirname, '../client')));
    };
    // Statyczna metoda do uruchonienia aplikacji
    Server.bootstrap = function () {
        return new Server();
    };
    // metoda służąca jedynie dla tej statycznej za start na zadanym porcie
    Server.prototype.startServer = function () {
        this.app.listen(3000, function () {
            console.log("Aplikacja działa na porcie 3000");
        });
    };
    return Server;
}());
exports.Server = Server;
//# sourceMappingURL=server.js.map