import { observable, action, decorate } from "mobx";

class Cart {
    counter = 0;
    currentProduct = 1;
    increment() { this.counter++; }
    decrement() { this.counter--; }
}

decorate(Cart, {
    counter: observable,
    currentProduct: observable,
    increment: action
});

export default new Cart();