import {Component, OnInit} from "@angular/core";
import {Product} from "./product";
import {ProductService} from "./product.service";

@Component({
    selector: 'my-app',
    template:`<h1>Products</h1>
            <ul class="products">
                <li *ngFor="let product of products_list">
                    {{product.name}}
                    <span class="quantity">{{product.quantinity}}</span>
                </li>
            </ul>`,
    providers: [ProductService]
})

export class AppComponent implements OnInit{
    selectedProduct: Product;
    products_list: Array<Product> = [];

    constructor(private productService: ProductService) {

    }

    getProducts(): void {
        this.productService.getProducts().then((response) => {
            return this.products_list = response;
        });
    }

    ngOnInit(): void {
        this.getProducts();
    }
}