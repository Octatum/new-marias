import React, { useState, useEffect } from 'react';
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

  const [totalProductCount, setTotalProductCount] = useState(0);

  useEffect(() => {
    const productCount = products.reduce(
      (amount, product) => amount + product.amount,
      0
    );

    setTotalProductCount(productCount);
  }, [products]);

  function addProduct(product, amount) {
    const productInList = products.find(p => p.sku === product.sku);

    if (productInList) {
      increaseProductAmount(productInList, amount);
      return;
    }
    const pr = { ...product, amount };

    const newProducts = [...products, pr];

    setProducts(newProducts);
  }

  function resetProducts() {
    setProducts([]);
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
    resetProducts,
    productAmount: totalProductCount,
  };
}
export default CartContext;
