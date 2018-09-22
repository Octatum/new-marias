import { observable, action, decorate } from "mobx";

class Cart {
    counter = 0;
    currentProduct = 1;
    orders = [
        {productId: 6, quantity: 8}
    ]
    increment() { this.counter++; }
    decrement() { this.counter--; }
}

decorate(Cart, {
    counter: observable,
    currentProduct: observable,
    orders: observable,
    increment: action
});

export default new Cart();