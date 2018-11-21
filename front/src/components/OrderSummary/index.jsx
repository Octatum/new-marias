import React from 'react';
import styled from 'styled-components';
import { CartConsumer } from '../CartContext';
import device from './../../utilities/device';
import SummaryRow from './SummaryRow';

const Layout = styled('div')`
  display: flex;
`;

const StepContainer = styled('div')`
  flex: 3;
`;

const SummaryContainer = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
  box-sizing: border-box;
  padding: 15px;
  box-sizing: border-box;
  padding-right: 10%;
  > div:last-child {
    border-bottom: none;
  }
  ${device.mobile} {
    display: 'none';
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 5% 12px 5%;
  vertical-align: middle;
  h1 {
    align-self: center;
  }
`;

const Section = styled.div`
  border-bottom: 2px solid #d6d8db;
  display: flex;
  flex-direction: column;
`;

const Total = styled.h1`
  font-size: 24px;
`;

const OrderSummary = props => {
  const { children, shippingData } = props;

  return (
    <CartConsumer>
      {({ products }) => {
        const subTotal = products.reduce((a, p) => p.price * p.amount + a, 0);

        return (
          <Layout>
            <StepContainer>{children}</StepContainer>
            <SummaryContainer>
              <h2>Resumen</h2>
              <Section>
                {products.map(product => (
                  <SummaryRow key={product.name} product={product} />
                ))}
              </Section>
              <Section>
                <Field>
                  <h3>Subtotal</h3>
                  <h1>${subTotal.toFixed(2)}</h1>
                </Field>
                <Field>
                  <h3>Envío</h3>
                  <h1>${shippingData && shippingData.price.toFixed(2)}</h1>
                </Field>
              </Section>
              <Section>
                <Field>
                  <h3>Total</h3>
                  <Total>${shippingData && (subTotal + shippingData.price).toFixed(2)}</Total>
                </Field>
              </Section>
            </SummaryContainer>
          </Layout>
        );
      }}
    </CartConsumer>
  );
};

OrderSummary.defaultProps = {
  products: [],
};

export default OrderSummary;
