import {Product} from "./product";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/toPromise';
import {Http} from "@angular/http";

@Injectable()

export class ProductService {
    private header = new Headers({ 'Content-Type': 'application/json'});
    private productsUrl = 'products';
    constructor(private http: Http) {}

    getProducts(): Promise<Product[]> {
        return this.http.get(this.productsUrl)
            .toPromise()
            .then(response => response.json() as Product[])  // rzutowanie na daną klasę
            .catch(this.handleError)
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }

    update(product: Product): Promise<Product> {
        const url = `${this.productsUrl}/update/${product.id}`;
        return this.http.post(url, JSON.stringify(product), {headers: { 'Content-Type': 'application/json'}})
            .toPromise()
            .then(() => Product)
            .catch(this.handleError)
    }
}