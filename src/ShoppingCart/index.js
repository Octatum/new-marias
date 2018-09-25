import { observable, action, decorate } from 'mobx';

class Cart {
  counter = 0;
  currentProduct = 1;
  orders = [];
  increment() {
    this.counter++;
  }
  decrement() {
    this.counter--;
  }
  deleteOrder(index) {
    this.orders.splice(index, 1);
    console.log(this.orders);
  }
  addOrder(productId, quantity) {
    this.orders.push({ productId, quantity });
  }
  increaseQuantity(index) {
    this.orders[index].quantity++;
  }
  decreaseQuantity(index) {
    if (this.orders[index].quantity > 1) {
      this.orders[index].quantity--;
    }
  }
}

decorate(Cart, {
  counter: observable,
  currentProduct: observable,
  orders: observable,
  increment: action,
  deleteOrder: action,
});

export default new Cart();
