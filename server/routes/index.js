"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var IndexRoute = (function () {
    function IndexRoute() {
    }
    IndexRoute.routes = function (nameOfHome) {
        var router = express_1.Router();
        var indexRoute = new IndexRoute();
        router.get(nameOfHome, indexRoute.index.bind(indexRoute));
        return router; // zwraca nazwę strony w postaci obiektu express.Router()
    };
    IndexRoute.prototype.index = function (req, res) {
        res.send("hello Wurld!11!!");
    };
    return IndexRoute;
}());
exports.IndexRoute = IndexRoute;
//# sourceMappingURL=index.js.map