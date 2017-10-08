export class Product {
    private id: number;
    public name: string;
    public quantinity: number;

    constructor(id:number, name: string, quantinity: number = 0) {
        this.id = id;
        this.name = name;
        this.quantinity = quantinity;
    }

    public updateQuantinity(newQuantinity: number) {
        this.quantinity = newQuantinity;
    }

    public addProducts(addedQuantinity: number) {
        this.quantinity += addedQuantinity;
    }

    public substractProducts(substractedQuantinity: number) {
        this.quantinity -= substractedQuantinity;
    }

    public getId(): number {
        return this.id;
    }




    public getName(): string {
        return this.name;
    }
}