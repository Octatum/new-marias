import { observable, action, decorate } from 'mobx';

class Client {
  email = '';
  names = '';
  lastNames = '';
  streetAndNumber = '';
  neighborhood = '';
  city = '';
  country = '';
  state = '';
  postalCode = '';
  tel = '';
}

decorate(Client, {
  email: observable,
  names: observable,
  lastNames: observable,
  streetAndNumber: observable,
  neighborhood: observable,
  city: observable,
  country: observable,
  state: observable,
  postalCode: observable,
  tel: observable,
  /*
  counter: observable,
  currentProduct: observable,
  orders: observable,
  subtotal: observable,
  increment: action,
  deleteOrder: action,
  addOrder: action,
  decreaseQuantity: action,
  increaseQuantity: action
  */
});

export default new Client();
