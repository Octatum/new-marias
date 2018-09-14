import { observable, action, decorate } from "mobx";

class Cart {
    counter = 0;
    increment() { this.counter++; }
    decrement() { this.counter--; }
}

decorate(Cart, {
    counter: observable,
    increment: action,
    tick: action
});

export default new Cart();