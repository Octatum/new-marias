import React from 'react';
import styled from 'styled-components';
import shoppingCartImg from './assets/shoppingcart.svg';
import device from '../../utilities/device';
import GatsbyLink from 'gatsby-link';
import { CartConsumer } from '../CartContext';

const Container = styled(GatsbyLink)`
  display: block;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  z-index: 99;
  ${device.mobile} {
    z-index: 99;
  }
`;

const Counter = styled.div`
  height: 100%;
  width: 100%;
  font-family: 'Archivo Narrow', sans-serif;
  background-image: url(${shoppingCartImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: relative;
  text-align: center;
  ::after {
    top: calc(50% - ${props => props.height}px);
    position: absolute;
    content: "${props => props.quantity}";
    color: #ffffff;
  }
`;

const CartCounter = ({ quantity, ...props }) => (
  <CartConsumer>
    {({ products }) => {
      const amount = products.reduce(
        (accum, product) => accum + product.quantity,
        0
      );

      return (
        <Container to={'/carrito'} {...props}>
          <Counter
            quantity={amount}
            height={10}
            aria-label={`hay ${amount} productos en el carrito.`}
          />
        </Container>
      );
    }}
  </CartConsumer>
);
export default CartCounter;
