import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Link } from 'gatsby';

import OrdersTable from '../../components/OrdersTable';
import SubtotalSummary from '../../components/SubtotalSummary';
import device from '../../utilities/device';
import AppLayout from '../../components/AppLayout';
import Button from '../../components/Button';
import { useShopifyFunctions } from '../../components/ShopifyContext';

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

const CheckoutDetails = () => {
  const { getCheckout, removeItem, updateItem } = useShopifyFunctions();
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const [checkoutUrl, setCheckoutUrl] = useState(null);

  function getValuesFromCheckout(checkout) {
    console.log({ checkout });
    setTotalPrice(checkout.totalPrice);
    setProducts(checkout.lineItems);
    setCheckoutUrl(checkout.webUrl);
  }

  useEffect(() => {
    async function getLocalCheckout() {
      const checkout = await getCheckout();
      getValuesFromCheckout(checkout);
    }

    getLocalCheckout();
  }, []);

  async function updateProductQuantity(id, quantity) {
    console.log({ id, quantity });
    const checkout = await updateItem({ id, quantity });
    getValuesFromCheckout(checkout);
    console.log(checkout.lineItems.map(item => item.quantity));
  }

  return (
    <Container>
      <OrdersTable
        products={products}
        removeItem={removeItem}
        updateItem={updateProductQuantity}
      />

      <SubtotalSummary totalPrice={totalPrice} />

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
