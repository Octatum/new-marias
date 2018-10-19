import React from 'react';
import styled from 'styled-components';
import OrderRow from './OrderRow';
import { observer } from 'mobx-react';
import { StaticQuery, graphql } from 'gatsby';
import device from './../../utilities/device';

const ContentTable = styled.table`
  margin: 0 auto;
  margin-top: 20px;
  font-size: 20px;
  width: 100%;
  font-family: 'Archivo Narrow', sans-serif;
  color: #ffffff;
  border-collapse:collapse;
  ${device.mobile} {
    margin-bottom: 46px;
  }
`;

const TableHead = styled.thead`
  border-collapse:collapse;
  background-color: #d4ad9f;
  width: 100%;
  text-align: center;
  th {
    width: 19%;
    height: 47px;
    line-height: 47px;
    border: none;
    border-collapse: collapse;
  }
  th:last-child {
    width: 5%;
  }
  ${device.mobile} {
    th {
      font-size: 0;
      height: 53px;
    }
  }
`;

const OrdersTable = (props) => {
  const { deleteOrderHandler, onDecreaseQuantity, onIncreaseQuantity, orders } = props;
  let prodRows = null;
  return (
  <StaticQuery
    query={graphql`
      query{
        allProductsJson {
          edges {
            node {
              price,
              name,
              id
            }
          }
        }
      }
    `}
    render={data => {  
     const products = data.allProductsJson.edges.map(edge => edge.node);
     prodRows = orders.map((o, index) => {
       const prod = products.find(p => o.productId == p.id);
       return (
          <OrderRow
            name={prod.name}
            price={parseFloat(prod.price)}
            quantity={o.quantity}
            deleteOrderHandler={() => deleteOrderHandler(index)}
            onDecreaseQuantity={() => onDecreaseQuantity(index)}
            onIncreaseQuantity={() => onIncreaseQuantity(index)}
          />
       );
     });
      return(
        <ContentTable>
          <TableHead>
            <tr>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th />
            </tr>
          </TableHead>
          <tbody>{prodRows}</tbody>
        </ContentTable>
      );
    }}
  />);
};
export default observer(OrdersTable);
