import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import OrdersTable from '../../components/OrdersTable';
import SubtotalSummary from '../../components/SubtotalSummary';
import device from '../../utilities/device';
import AppLayout from '../../components/AppLayout';
import { CartConsumer } from '../../components/CartContext';

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-bottom: 40px;
  ${device.tablet} {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: block;
  button {
    background-color: #d4ad9f;
    border: none;
    height: 40px;
    margin: 5px 0;
    color: #ffffff;
    font-size: 18px;
    float: right;
    width: ${props => props.width}px;
    :hover {
      cursor: pointer;
    }
    ${device.mobile} {
      margin-right: 33px;
      display: ${({ mobileHide }) => (mobileHide ? 'none' : 'block')};
    }
  }
  ::after {
    content: '';
    clear: both;
    display: table;
  }
`;

const Carrito = () => {
  return (
    <AppLayout>
      <CartConsumer>
        {({ addProduct, products, ...rest }) => (
          <Container>
            <OrdersTable products={products} {...rest} />

            <SubtotalSummary products={products} />

            <ButtonContainer width={115} mobileHide>
              <Link to="/">
                <button>Regresar</button>
              </Link>
            </ButtonContainer>
            <ButtonContainer width={156}>
              <Link to="/tienda/checkout/cliente">
                <button>Continuar</button>
              </Link>
            </ButtonContainer>
          </Container>
        )}
      </CartConsumer>
    </AppLayout>
  );
};

export default Carrito;
