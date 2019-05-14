import { useContext, useReducer, useEffect } from 'react';

import { MoltinGatewayContext, CartIdContext } from '../AppLayout';

export const SET_CART = 'SET_CART';
export const RESET_CART = 'RESET_CART';

export const initialState = {
  count: 0,
  items: [],
  cartItems: [],
  promotionItems: [],
  taxItems: [],
  meta: null,
  subTotal: 0,
};

export default function reducer(state, action) {
  switch (action.type) {
    case SET_CART:
      const { data: items, meta } = action.payload;

      const cartItems = items.filter(({ type }) => type === 'cart_item');
      const promotionItems = items.filter(
        ({ type }) => type === 'promotion_item'
      );
      const taxItems = items.filter(({ type }) => type === 'tax_item');
      const otherItems = items.filter(
        ({ type }) =>
          !['tax_item', 'promotion_item', 'cart_item'].includes(type)
      );
      const count = cartItems.reduce(
        (sum, { type, quantity }) => type === 'cart_item' && sum + quantity,
        0
      );

      const subTotal = meta ? meta.display_price.without_tax.amount : 0;

      return {
        ...state,
        items,
        cartItems,
        otherItems,
        promotionItems,
        taxItems,
        count,
        meta,
        subTotal,
      };

    case RESET_CART:
      return initialState;

    default:
      return state;
  }
}

function useCartkit() {
  const moltin = useContext(MoltinGatewayContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { id: cartId, generateNewCartId } = useContext(CartIdContext);

  const isEmpty = state.count === 0;

  useEffect(() => {
    if (!cartId) return;
    getCart(cartId);
  }, [cartId]);

  async function getCart(id) {
    if (!moltin) return;
    const payload = await moltin.get(`carts/${id}/items?include=files`);

    dispatch({ type: SET_CART, payload });
  }

  async function addToCart(id, quantity) {
    if (!cartId) throw new Error(`Cart ID should not be null`);
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'cart_item',
      id,
      quantity,
    });

    dispatch({ type: SET_CART, payload });
    return payload;
  }

  async function addDelivery(deliveryItem) {
    if (!cartId) throw new Error(`Cart ID should not be null`);
    const currentDelivery = state.otherItems.find(
      item => item.sku === 'delivery-item'
    );
    if (!!currentDelivery) {
      await removeFromCart(currentDelivery.id);
    }
    const sku = 'delivery-item';
    const payload = await moltin.post(`carts/${cartId}/items`, {
      type: 'custom_item',
      name: `${deliveryItem.name} delivery`,
      sku,
      quantity: 1,
      price: {
        amount: deliveryItem.price,
      },
    });

    dispatch({ type: SET_CART, payload });
    return payload;
  }

  async function updateQuantity(id, quantity) {
    const payload = await moltin.put(`carts/${cartId}/items/${id}`, {
      type: 'cart_item',
      id,
      quantity,
    });

    dispatch({ type: SET_CART, payload });
  }

  async function removeFromCart(id) {
    const payload = await moltin.delete(`carts/${cartId}/items/${id}`);

    dispatch({ type: SET_CART, payload });
  }

  async function resetCart() {
    generateNewCartId();
  }

  return {
    ...state,
    isEmpty,
    addToCart,
    updateQuantity,
    removeFromCart,
    resetCart,
    addDelivery,
  };
}

export { useCartkit };
