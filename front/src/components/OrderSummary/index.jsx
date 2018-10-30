import React from 'react';
import styled from 'styled-components';
import SummaryRow from './SummaryRow';
import { StaticQuery, graphql } from 'gatsby';
import Cart from './../../ShoppingCart';
import device from './../../utilities/device';

const Container = styled.div`
  > h1 {
    margin-top: -10px;
    margin-left: 2%;
  }
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
  font-size: 14px;
  box-sizing: border-box;
  padding: 15px;
  > div:last-child {
    border-bottom: none;
  }
  ${device.mobile} {
    display: ${({ mobileHide }) => (mobileHide ? 'none' : 'block')};
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
`;

const Total = styled.h1`
  font-size: 24px;
`;

const ProductImage = styled.div`
  width: 65px;
  height: 65px;
  background: #c4c4c4;
`;
const ProductView = styled.div`
  display: flex;
  flex-direction: row;
  h1 {
    margin-left: 15px;
  }
`;

const query = graphql`
  query {
    allProductsJson {
      edges {
        node {
          id
          name
          price
          category
          path
          thumbnail
          images {
            color 
            src
          }
        }
      }
    }
  }
`;

const shippingCost = 0.0;
const OrderSummary = props => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const orders = Cart.orders;
        const products = data.allProductsJson.edges.map(edge => edge.node);
        const newOrders = orders.map((o, index) => {
          const prod = products.find(p => o.productId == p.id);
          return {
            id: index,
            name: prod.name,
            quantity: o.quantity,
            price: prod.price,
            src: prod.thumbnail,
          };
        });
        const summaryRows = newOrders.map(product => (
          <Field key={product.id}>
            <SummaryRow
              quantity={product.quantity}
              name={product.name}
              price={product.price}
              src={product.src}
            />
          </Field>
        ));
        const subTotal = newOrders.reduce(
          (total, o) => total + o.price * o.quantity,
          0
        );

        return (
          <Container mobileHide={props.mobileHide}>
            <h1>Resumen</h1>
            <Section>{summaryRows}</Section>
            <Section>
              <Field>
                <h1>Subtotal</h1>
                <h1>${subTotal.toFixed(2)}</h1>
              </Field>
              <Field>
                <h1>Envío</h1>
                <h1>${shippingCost.toFixed(2)}</h1>
              </Field>
            </Section>
            <Section>
              <Field>
                <h1>Total</h1>
                <Total>${(subTotal + shippingCost).toFixed(2)}</Total>
              </Field>
            </Section>
          </Container>
        );
      }}
    />
  );
};

export default OrderSummary;
