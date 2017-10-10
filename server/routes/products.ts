import { Router, Request, Response } from "express";
import { Product } from '../model/product';
import { Products } from '../model/products';

export class ProductsRoutes {
    private productList: Products;

    constructor() {
        // this.productList.push(new Product(1, 'ABC', 1));
        this.productList = new Products([
            new Product(1, 'ABC', 1),
            new Product(2, 'ABCEFG', 1),
        ]);
    }

    public static routes(nameOfHome: string): Router {
        let router : Router = Router();
        let productsRoute: ProductsRoutes = new ProductsRoutes();
        router.get(nameOfHome, productsRoute.index.bind(productsRoute));
        router.post(`${nameOfHome}/`, productsRoute.create.bind(productsRoute));
        router.get(`${nameOfHome}/:product`, productsRoute.find.bind(productsRoute));

        router.post(`${nameOfHome}/delete/:product`, productsRoute.delete.bind(productsRoute));
        router.delete(`${nameOfHome}/delete/:product`, productsRoute.delete.bind(productsRoute));

        router.post(`${nameOfHome}/update/:product`, productsRoute.update.bind(productsRoute));
        router.put(`${nameOfHome}/update/:product`, productsRoute.update.bind(productsRoute));
        return router; // zwraca nazwę strony w postaci obiektu express.Router()
    }
    public index(req: Request, res: Response){
        // res.send("strona produkty")
        res.json(this.productList.list());
    }

    public create(req: Request, res: Response) {
        let prodName: string = req.body.product_name;
        let prodQuantinity: number = parseInt(req.body.product_quantinity) || 0;

        if(!prodName) {
            res.status(500).send("Nie ma takiego produktu");
            return false;
        }


        // tu
        res.json(this.productList.add(prodName, prodQuantinity));
    }


    public delete(req: Request, res: Response) {
        let prodId: number = parseInt(req.params.product);
        let productWasDeleted: boolean = this.productList.delete(prodId);
        if(!productWasDeleted) {
            res.status(404).send("Nie ma takiego produktu");
            return false;
        } else {
            res.json({success: true});
        }
    }

    public update(req: Request, res: Response) {
        let prodId: number = parseInt(req.params.product);
        let product: Product = this.productList.fetch(prodId);

        let productName: string = req.body.product_name; // przekazana wartosc dla PUT
        let productQuantity: number = parseInt(req.body.product_quantity, 10); // przekazana wartosc dla PUT


        if(!product) {
            res.status(404).send("Nie ma takiego produktu");
            return false;
        }

        if ( productName !== undefined) {
            product.updateName(productName);
        }

        if ( productQuantity !== undefined) {
            product.updateQuantinity(productQuantity);
        }
    }

    //zminaa
    public find(req: Request, res: Response) {
        let prodQuery: string = req.params.product;
        let product: Product = this.productList.find(prodQuery);
        if(!prodQuery) {
            res.status(404).send("Nie ma takiego produktu");
            return false;
        }
        res.json(product);
    }
}