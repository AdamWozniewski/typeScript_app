import {Component, OnInit} from "@angular/core";
import {Product} from "./product";
import {ProductService} from "./product.service";

@Component({
    selector: 'my-app',
    template:`<h1>Products</h1>
            <ul class="products">
                <li *ngFor="let product of products_list" (click)="onSelect(product)" [class.selectedsss]="product===selectedProduct">
                    <span class="quantity">{{product.quantinity}}</span>
                    {{product.name}}
                    <button (click)="delete(product); $event.stopPropagation()">usun</button>
                </li>
            </ul>
            <div *ngIf="selectedProduct">
                <h2>{{selectedProduct.name}} - {{selectedProduct.quantinity}}</h2>

                <div>
                    <label>name:</label>
                    <input [(ngModel)]="selectedProduct.name" placeholder="name">

                    <label>quantity:</label>
                    <input [(ngModel)]="selectedProduct.quantinity" placeholder="quantity">
                    <button (click)="save()" >Zapisz</button>
                </div>
            </div>
            <hr>
            <div>
                <label>Nazwa produktu</label>
                <input #productName/>

                <label>Ilosc</label>
                <input #productQuantity/>
                <button (click)="add(productName.value, productQuantity.value)" >Dodaj product</button>
            </div>
    `
            ,
    styles:[`
        .selected {
            background: #CFD8DC !important;
        }
        .products {
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
            width: 15em;
        }
        .products li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color:#EEE;
            margin: .5em;
            padding: .3em 0;
            height: 1.6em;
            border-radius: 4px;
        }
        .products li.selected:hover {
            background-color:#BBD8DC !important;
            color: #fff;
        }
        .products li:hover {
            color: #607d8b;
            background-color:#DDD;
            left: .1em;
        }
        .products .quantity {
            display: inline-block;
            font-size: small;
        }
    `],
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

    onSelect(product: Product): void {
        this.selectedProduct = product;
    }

    save(): void {
        this.productService.update(this.selectedProduct).then(() => this.getProducts())
    }

    add(productName: string, productQuantity: string): void {
        productName = productName.trim();
        productQuantity = productQuantity.trim();

        if (!productName || !productQuantity) {
            return;
        }

        this.productService.create(productName, productQuantity)
            .then(products => {
                console.log(products)
                this.products_list = products;
                this.selectedProduct = null;
            });
    }

    delete(product: Product): void {
        this.productService.delete(product.id).then(products => {
            this.products_list = this.products_list.filter((p) => p !== product);
            console.log(this.products_list)
            if (this.selectedProduct === products) {
                this.selectedProduct = null;
            }
        })
    }

    ngOnInit(): void {
        this.getProducts();
    }
}