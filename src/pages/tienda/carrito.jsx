import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'gatsby';

import OrdersTable from '../../components/OrdersTable';
import device from '../../utilities/device';
import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import { useShopifyFunctions } from '../../components/ShopifyContext';
import Text from '../../components/Text';

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
  return (
    <AppLayout>
      <Helmet title="Mi carrito" />
      <CheckoutDetails />
    </AppLayout>
  );
};

const Summary = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CheckoutDetails = () => {
  const { removeItem, updateItem, checkout } = useShopifyFunctions();
  const {
    subtotalPrice: totalPrice,
    lineItems: products,
    webUrl: checkoutUrl,
  } = checkout;

  async function updateProductQuantity(id, quantity) {
    updateItem({ id, quantity });
  }

  return (
    <Container>
      <OrdersTable
        products={products}
        removeItem={removeItem}
        updateItem={updateProductQuantity}
      />

      <Summary>
        <Text>SUBTOTAL</Text>
        <Text>${totalPrice} MXN</Text>
      </Summary>

      <ButtonContainer width={115} mobileHide>
        <CustomButton color="orange" as={Link} to="/tienda">
          Regresar
        </CustomButton>
        <CustomButton
          color="pink"
          disabled={checkoutUrl === null}
          as={'a'}
          href={checkoutUrl}
        >
          Continuar
        </CustomButton>
      </ButtonContainer>
    </Container>
  );
};

export default Carrito;
