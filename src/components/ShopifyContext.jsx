import React, { createContext, useContext, useEffect } from 'react';
import shopify from 'shopify-buy';
import persistedStateCreator from 'use-persisted-state';

const persistedStateId = 'shopifyCheckout';
const useShopifyCheckout = persistedStateCreator(persistedStateId);

const client = shopify.buildClient({
  domain: `${process.env.SHOP_NAME}.myshopify.com`,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
});

const Context = createContext(null);

const useShopifyClient = () => {
  const value = useContext(Context);
  return value;
};

const useShopifyFunctions = () => {
  const client = useShopifyClient();
  const [shopifyCheckoutId, setShopifyId] = useShopifyCheckout(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function getCheckoutId() {
    if (shopifyCheckoutId === null) {
      await resetCart();
    }

    return shopifyCheckoutId;
  }

  async function addItem({ variantId, quantity }) {
    const checkout = await client.checkout.addLineItems(shopifyCheckoutId, [
      { variantId, quantity },
    ]);

    return checkout;
  }

  async function removeItem({ variantId }) {
    const checkout = await client.checkout.removeLineItems(shopifyCheckoutId, [
      variantId,
    ]);

    return checkout;
  }

  async function resetCart() {
    const checkout = await client.checkout.create();
    setShopifyId(checkout.id);
  }

  async function getCheckout() {
    const checkout = await client.checkout.fetch(shopifyCheckoutId);

    return checkout;
  }

  async function updateItem({ id, quantity }) {
    const checkout = await client.checkout.updateLineItems(shopifyCheckoutId, [
      {
        id,
        quantity,
      },
    ]);

    return checkout;
  }

  useEffect(() => {
    getCheckoutId();
  }, []);

  return {
    getCheckoutId,
    addItem,
    removeItem,
    resetCart,
    getCheckout,
    updateItem,
  };
};

function Provider({ children }) {
  return <Context.Provider value={client}>{children}</Context.Provider>;
}

export {
  Provider as ShopifyClientProvider,
  useShopifyClient,
  useShopifyFunctions,
};
