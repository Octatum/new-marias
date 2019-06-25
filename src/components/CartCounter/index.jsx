import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import shoppingCartImg from './assets/shoppingcart.svg';
import GatsbyLink from 'gatsby-link';
import { useShopifyFunctions } from '../ShopifyContext';

const Container = styled(GatsbyLink)`
  display: block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 99;
`;

const Counter = styled.div`
  height: 100%;
  width: 100%;
  font-family: ${({theme}) => theme.fonts.main};
  background-image: url(${shoppingCartImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  text-align: center;

  ::after {
    position: absolute;
    top: 50%;
    transform: translateY(-60%);
    content: "${props => props.quantity}";
    color: #ffffff;
  }
`;

const CartCounter = ({ ...props }) => {
  const { getCheckout } = useShopifyFunctions();
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    async function getProductQuantity() {
      try {
        const checkout = await getCheckout();
        setQuantity(checkout.lineItems.length);
      } catch (exception) {
        console.log(exception);
      }
    }

    getProductQuantity();
  }, [getCheckout]);

  return (
    <Container to={'/tienda/carrito'} {...props}>
      <Counter
        quantity={quantity}
        height={10}
        aria-label={`hay ${0} productos en el carrito.`}
      />
    </Container>
  );
};

export default CartCounter;
