import {Product} from "./product";
import {Injectable} from "@angular/core";

@Injectable()

export class ProductService {
  getProducts(): Promise<Product[]> {
    return new Promise<Product[]>
              (resolve => setTimeout(resolve, 2000))
              .then(()=>[
                  {name: 'test 11', quantity: 1}
              ]);
  }
}