import React, { Component } from 'react';
import createPersistedState from 'use-persisted-state';

const CartContext = React.createContext({
  products: [],
  addProduct: () => {},
  removeProduct: () => {},
  increaseProductAmount: () => {},
  decreaseProductAmount: () => {},
});

const LOCAL_STORAGE_ID = 'cart_products';
const useProductsState = createPersistedState(LOCAL_STORAGE_ID);

export function useProducts() {
  const [products, setProducts] = useProductsState([]);

  function addProduct(product) {
    const productInList = products.find(p => p.sku === product.sku);

    if (productInList) {
      increaseProductAmount(productInList, product.amount);
      return;
    }

    const newProducts = [...products, product];

    setProducts(newProducts);
  }

  function removeProduct(product) {
    const newProducts = products.filter(p => p.sku !== product.sku);

    setProducts(newProducts);
  }

  function increaseProductAmount(product, amount = 1) {
    const { sku } = product;

    const newProducts = products.map(p => {
      if (p.sku === sku) {
        return {
          ...p,
          amount: p.amount + amount,
        };
      }

      return { ...p };
    });

    setProducts(newProducts);
  }

  function decreaseProductAmount(product) {
    const { sku } = product;
    const newProducts = products.map(p => {
      if (p.sku === sku) {
        const newAmount = p.amount - 1;
        return {
          ...p,
          amount: newAmount < 1 ? 1 : newAmount,
        };
      }

      return { ...p };
    });

    setProducts(newProducts);
  }

  return {
    products,
    removeProduct,
    addProduct,
    increaseProductAmount,
    decreaseProductAmount,
  };
}

class CartProvider extends Component {
  constructor(props) {
    super(props);

    this.removeProduct = this.removeProduct.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.increaseProductAmount = this.increaseProductAmount.bind(this);
    this.decreaseProductAmount = this.decreaseProductAmount.bind(this);

    this.state = {
      removeProduct: this.removeProduct,
      addProduct: this.addProduct,
      increaseProductAmount: this.increaseProductAmount,
      decreaseProductAmount: this.decreaseProductAmount,
      products: [],
    };
  }

  componentDidMount() {
    this.setState(() => ({
      products: this.retrieveFromLocalStorage(),
    }));
  }

  commitToLocalStorage(products) {
    if (typeof window === undefined) return;

    const productsJson = JSON.stringify(products);

    window.localStorage.setItem(LOCAL_STORAGE_ID, productsJson);
  }

  retrieveFromLocalStorage() {
    if (typeof window === undefined) return [];

    const products = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_ID));

    return products || [];
  }

  addProduct(product) {
    // Check if product is in list
    const productInList = this.state.products.find(
      p => p.id === product.id && p.type === product.type
    );

    if (productInList) {
      this.increaseProductAmount(productInList, product.amount);
      return;
    }

    this.setState(prevState => {
      const newProducts = [...prevState.products, product];

      this.commitToLocalStorage(newProducts);

      return {
        products: newProducts,
      };
    });
  }

  removeProduct(product) {
    const { id: productId, type: productType } = product;

    this.setState(prevState => {
      const newProducts = prevState.products.filter(
        p => p.id !== productId || p.type !== productType
      );

      this.commitToLocalStorage(newProducts);

      return {
        products: newProducts,
      };
    });
  }

  increaseProductAmount(product, amount = 1) {
    const { id: productId, type: productType } = product;

    this.setState(prevState => {
      const newProducts = prevState.products.map(p => {
        if ((p.id === productId, p.type === productType)) {
          return {
            ...p,
            amount: p.amount + amount,
          };
        }

        return { ...p };
      });

      this.commitToLocalStorage(newProducts);

      return {
        products: newProducts,
      };
    });
  }

  decreaseProductAmount(product) {
    const { id: productId, type: productType } = product;

    this.setState(prevState => {
      const newProducts = prevState.products.map(p => {
        if (p.id === productId && p.type === productType) {
          const newAmount = p.amount - 1;
          return {
            ...p,
            amount: newAmount < 1 ? 1 : newAmount,
          };
        }

        return { ...p };
      });

      this.commitToLocalStorage(newProducts);

      return {
        products: newProducts,
      };
    });
  }

  render() {
    const { children } = this.props;

    return (
      <CartContext.Provider value={this.state}>{children}</CartContext.Provider>
    );
  }
}

const Consumer = CartContext.Consumer;

export { CartContext as default, CartProvider, Consumer as CartConsumer };
