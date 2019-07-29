import React from 'react';
import styled from 'styled-components';
import shoppingCartImg from './assets/shoppingcart.svg';
import GatsbyLink from 'gatsby-link';
import { useShopifyFunctions } from '../ShopifyContext';

const Container = styled(GatsbyLink)`
  display: block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 5;
  text-decoration: none;
  background-image: url(${shoppingCartImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding-left: 7px;
  padding-bottom: 5px;
  box-sizing: border-box;
`;

const Counter = styled('div')`
  height: 100%;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.main};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;

const CartCounter = ({ ...props }) => {
  const { checkout } = useShopifyFunctions();
  const quantity = checkout.loaded && checkout.lineItems.length;

  return (
    <Container to={'/tienda/carrito'} {...props} name="Ir al carrito">
      <Counter
        quantity={quantity}
        aria-label={`hay ${quantity} productos en el carrito.`}
      >
        {checkout.loaded ? quantity : '...'}
      </Counter>
    </Container>
  );
};

export default CartCounter;
