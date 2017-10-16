import { Product } from './product'

export class Products {
    private listProducts : Array<Product>;
    constructor(products: Array<Product> = []) {
        this.listProducts = new Array<Product>();

        products.forEach(
            (prod) => {
                this.listProducts.push(prod)
            }
        );
    }

    public list(): Array<Product> {
        return this.listProducts;
    }

    public add(productName: string, productQuantinity: number): Array<Product> {
        let productids : Array<number>  = this.listProducts.map((product) => product.getId());
        let productIdMax: number = Math.max(...productids) + 1;

        let product = new Product(productIdMax, productName, productQuantinity);
        this.listProducts.push(product);
        return this.listProducts;
    }

    public fetch(productId: number): Product {
        return productId && this.listProducts.filter((product: Product) => product.getId() === productId).shift();
    }

    public find(productQuery: string): Product {
        let productId: number = parseInt(productQuery);
        console.log(productId, productQuery)
        let productQueryString = productQuery;
        productQueryString = productQueryString.toLocaleLowerCase();
        return this.listProducts.filter((product: Product) => product.getId() === productId || product.getName().toLocaleLowerCase() === productQueryString).shift();
    }

    public delete(productId: number): boolean {
        let deleted: boolean = false;

        this.listProducts = this.listProducts.filter((prod: Product) => {
            deleted = deleted || prod.getId() !== productId;
            return prod.getId() !== productId;
        });

        return deleted;
    }
}