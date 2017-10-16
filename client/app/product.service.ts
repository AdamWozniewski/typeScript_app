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
        return this.http.post(url, JSON.stringify(product), {headers: this.header})
            .toPromise()
            .then(() => Product)
            .catch(this.handleError)
    }

    create(productName: string, productQuantity: string): Promise<Product> {
        return this.http
            .post('products/',{
                name: productName,
                quantinity: productQuantity
            }, { headers: this.header })
            .toPromise()
            .then((result) => result.json())
            .catch(this.handleError);
    }

    delete(productId: number): Promise<Product> {
        return this.http.post(`${this.productsUrl}/delete/${productId}`,{id: productId},{ headers: this.header })
            .toPromise()
            .then(() => null)
            .catch(this.handleError)
    }
}