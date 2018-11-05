import React from 'react';
import styled from 'styled-components';
import OrderRow from './OrderRow';
import { observer } from 'mobx-react';
import { StaticQuery, graphql } from 'gatsby';
import device from './../../utilities/device';
import Cart from './../../ShoppingCart';

const ContentTable = styled.table`
  margin: 0 auto;
  margin-top: 20px;
  font-size: 20px;
  width: 100%;
  font-family: 'Archivo Narrow', sans-serif;
  color: #ffffff;
  border-collapse: collapse;
  ${device.mobile} {
    margin-bottom: 46px;
  }
`;

const TableHead = styled.thead`
  border-collapse: collapse;
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

const OrdersTable = props => {
  const { deleteOrderHandler, onDecreaseQuantity, onIncreaseQuantity } = props;
  let prodRows = null;
  return (
    <StaticQuery
      query={graphql`
        query {
          allCockpitProduct {
            edges {
              node {
                fields {
                  slug
                }
                id
                entry {
                  description
                  price
                  name
                  thumbnail {
                    path
                  }
                  gallery {
                    value {
                      color
                      images {
                        path
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `}
      render={data => {
        const products = data.allCockpitProduct.edges.map(edge => edge.node);
        console.log('orders: ', Cart.orders);
        prodRows = Cart.orders.map((o, index) => {
          const prod = products.find(p => o.productId === p.id);
          return (
            <OrderRow
              name={prod.entry.name}
              price={prod.entry.price}
              quantity={o.quantity}
              src={prod.entry.thumbnail.path}
              deleteOrderHandler={() => deleteOrderHandler(index)}
              onDecreaseQuantity={() => onDecreaseQuantity(index)}
              onIncreaseQuantity={() => onIncreaseQuantity(index)}
            />
          );
        });
        return (
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
    />
  );
};
export default observer(OrdersTable);
