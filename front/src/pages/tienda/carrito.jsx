import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

import OrdersTable from '../../components/OrdersTable';
import SubtotalSummary from '../../components/SubtotalSummary';
import device from '../../utilities/device';
import AppLayout from '../../components/AppLayout';
import { CartConsumer } from '../../components/CartContext';
import Button from '../../components/Button';

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-bottom: 40px;
  ${device.tablet} {
    width: 100%;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CustomButton = styled(Button)`
  font-size: 1.2em;
  margin-top: 0.5rem;
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
              <CustomButton color="palebrown" as={Link} to="/tienda">
                Regresar
              </CustomButton>
              <CustomButton color="palebrown" as={Link} to="/tienda/checkout/cliente">
                Continuar
              </CustomButton>
            </ButtonContainer>
          </Container>
        )}
      </CartConsumer>
    </AppLayout>
  );
};

export default Carrito;
