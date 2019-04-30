import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'gatsby';

import OrdersTable from '../../components/OrdersTable';
import SubtotalSummary from '../../components/SubtotalSummary';
import device from '../../utilities/device';
import AppLayout from '../../components/AppLayout';
import { CartConsumer, useProducts } from '../../components/CartContext';
import Button from '../../components/Button';

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-bottom: 40px;

  ${device.laptop} {
    width: 85%;
  }

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
  const { products } = useProducts();

  return (
    <AppLayout>
      <Helmet title="Mi carrito" />
      <Container>
        <OrdersTable products={products} />

        <SubtotalSummary products={products} />

        <ButtonContainer width={115} mobileHide>
          <CustomButton color="orange" as={Link} to="/tienda">
            Regresar
          </CustomButton>
          <CustomButton color="pink" as={Link} to="/tienda/checkout/cliente">
            Continuar
          </CustomButton>
        </ButtonContainer>
      </Container>
    </AppLayout>
  );
};

export default Carrito;
