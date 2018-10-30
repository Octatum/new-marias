import React from 'react';
import styled from 'styled-components';
import Cart from './../../ShoppingCart';
import { StaticQuery, graphql } from 'gatsby';
import device from './../../utilities/device';

const Summary = styled.div`
  font-family: 'Archivo Narrow', sans-serif;
  text-align: right;
  font-size: 18px;
  color: #626363;
  margin-bottom: 30px;
  p {
    margin: 5px 0;
  }
  ${device.mobile} {
    margin-right: 33px;
    p:nth-child(1) {
      font-size: 16px;
    }
  }
`;

const getSubtotal = products => {
  let subTotal = 0.0;
  const orders = Cart.orders;
  for (let i = 0; i < orders.length; i++) {
    const price = products.find(p => p.id === orders[i].productId).price;
    subTotal += price * orders[i].quantity;
  }
  return subTotal;
};

const SubtotalSummary = () => (
  <StaticQuery
    query={graphql`
      query {
        allProductsJson {
          edges {
            node {
              price
              id
            }
          }
        }
      }
    `}
    render={data => {
      const products = data.allProductsJson.edges.map(edge => edge.node);
      return (
        <Summary>
          <p>SUBTOTAL</p>
          <p>${getSubtotal(products).toFixed(2)} MXN</p>
        </Summary>
      );
    }}
  />
);
export default SubtotalSummary;
