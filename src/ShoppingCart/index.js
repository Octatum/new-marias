import { observable, action, decorate } from 'mobx';

class Cart {
  counter = 0;
  currentProduct = 1;
  orders = [];
  subtotal = 0;

  increment() {
    const newCounter = this.counter + 1;
    this.counter = newCounter;
  }

  decrement() {
    const newCounter = this.counter - 1;
    this.counter = newCounter;
  }

  deleteOrder(index) {
    let newOrders = this.orders.slice();
    newOrders.splice(index, 1);
    this.orders = newOrders;
  }

  addOrder(productId, quantity) {
    let newOrders = this.orders.slice();
    newOrders.push({ productId, quantity });
    this.orders = newOrders;
  }

  increaseQuantity(index) {
    let newOrders = this.orders.slice();
    newOrders = newOrders.map((order, i) => {
      if (i != index) return order;
      //  console.log(order);
      return {
        ...order,
        quantity: order.quantity + 1,
      };
    });
    this.orders = newOrders;
  }

  decreaseQuantity(index) {
    if (this.orders[index].quantity > 1) {
      let newOrders = this.orders.slice();
      newOrders = newOrders.map((order, i) => {
        if (i != index) return order;
        //     console.log(order);
        return {
          ...order,
          quantity: order.quantity - 1,
        };
      });
      this.orders = newOrders;
    }
  }
}

decorate(Cart, {
  counter: observable,
  currentProduct: observable,
  orders: observable,
  subtotal: observable,
  increment: action,
  deleteOrder: action,
  addOrder: action,
  decreaseQuantity: action,
  increaseQuantity: action,
});

export default new Cart();
