import React, { Component } from 'react';
import './../components/setup.css';
import Navbar from './../components/Navbar';
import styled from 'styled-components';
import device from './../utilities/device';
import { StaticQuery, graphql } from 'gatsby';
import Cart from './../ShoppingCart';
import Client from './../ClientInfo';
import SummaryGallery from './../components/SummaryGallery';
import './../components/setup.css';

const AppLayout = styled.div`
  margin-top: 190px;
  ${device.mobile} {
    margin-top: 95px;
  }
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
  box-sizing: border-box;
`;

const Container = styled.div`
  margin: 0 auto;
  width: 75%;
`;

const Title = styled.h1`
  font-size: 28px;
`;

const OrderSummary = styled.div`
  background-color: #f2f3f5;
  width: 100%;
  margin-top: 32px;
  margin-bottom: 50px;
  box-sizing: border-box;

  padding: 15px 32px;
  display: flex;
  flex-direction: row;

  > div {
    width: 30%;
  }

  > table {
    width: 70%;
    align-self: center;
    padding: 0;
    margin: 0;
  }

  table th {
    text-align: left;
  }

  table tr td {
    padding: 20px 20px 20px 0;
  }

  ${device.mobile} {
    background-color: #ffffff;
    border: 1px solid #000000;
    flex-direction: column;
    padding: 11px;
  }
`;

const MobileSummary = styled.div`
  width: 100% !important;
  > div:not(:last-child) {
    margin-bottom: 15px;
  }
  display: none;
  ${device.mobile} {
    display: block;
  }
`;
const MobileField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const ProductoPreview = styled.div`
  display: flex;
  flex-direction: row;
  > div:first-child {
    flex-grow: 0;
  }
  > table {
    margin-left: 25px;
  }
`;

const Img = styled.div`
  width: 90px;
  height: 90px;
  background-color: #c4c4c4;
  display: block;
  background: url(https://admin.newmarias.com/${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Products = styled.div`
  display: flex;
  flex-direction: column;
  > div:not(:last-child) {
    margin-bottom: 20px;
  }
  ${device.mobile} {
    display: none;
  }
`;

const OrderDetails = styled.div`
  box-sizing: border-box;
  padding: 5px 10px 15px 10px;
  margin-top: 10px;
  width: 100%;
  border: 1px solid #000000;
  display: flex;
  flex-direction: row;
  > div {
    display: flex;
    flex-direction: column;
  }
  > div:nth-child(1) {
    width: 33%;
  }
  > div:nth-child(2) {
    width: 23%;
  }
  > div:nth-child(3) {
    width: 45%;
  }
  > div > p:first-child {
    margin-bottom: 5px;
  }
  ${device.mobile} {
    flex-direction: column;
    > div {
      width: 100% !important;
      margin: 7px 0;
    }
    > div:nth-child(2) {
      order: -1;
    }
  }
`;

const SummaryField = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  ${device.mobile} {
    width: 75%;
  }
`;

const Label = styled.h2`
  font-size: 20px;
  color: #d4ad9f;
  margin-left: 13px;
`;

const Button = styled.button`
  height: 50px;
  width: 20%;
  border: none;
  background-color: #d4ad9f;
  color: #ffffff;
  float: right;
  margin-top: 25px;
  margin-bottom: 100px;
  font-size: 18px;
  :hover {
    cursor: pointer;
  }
  ${device.mobile} {
    width: 70%;
  }
`;

const Table = styled.table`
  ${device.mobile} {
    display: none;
  }
`;

const query = graphql`
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
`;

const shippingCost = 0;

class Resumen extends Component {
  state = {
    currentOrder: 0,
  };

  nextOrderHandler = () => {
    if (this.state.currentOrder < Cart.orders.length - 1) {
      let currentOrder = this.state.currentOrder + 1;
      this.setState({ currentOrder: currentOrder });
    }
  };

  previousOrderHandler = () => {
    if (this.state.currentOrder > 0) {
      let currentOrder = this.state.currentOrder - 1;
      this.setState({ currentOrder: currentOrder });
    }
  };

  getSubtotal = products => {
    let subTotal = 0.0;
    const orders = Cart.orders;
    for (let i = 0; i < orders.length; i++) {
      const price = products.find(p => p.id === orders[i].productId).entry
        .price;
      subTotal += price * orders[i].quantity;
    }
    return subTotal;
  };

  render() {
    return (
      <StaticQuery
        query={query}
        render={data => {
          const products = data.allCockpitProduct.edges.map(edge => edge.node);
          const prodRows = Cart.orders.map((o, index) => {
            const prod = products.find(p => o.productId === p.id);
            return (
              <ProductoPreview>
                <Img src={prod.entry.thumbnail.path} />
                <table>
                  <thead>
                    <tr>
                      <th>Producto</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        ({o.quantity}) {prod.entry.name}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </ProductoPreview>
            );
          });

          const productPerOrder = Cart.orders.map(o => {
            const prod = products.find(p => o.productId === p.id);
            return {
              displayImage: prod.entry.thumbnail.path,
              name: prod.entry.name,
              price: prod.entry.price,
            };
          });

          return (
            <AppLayout>
              <Navbar />
              <Container>
                <Title>Tu pedido con New Marías</Title>
                <OrderSummary>
                  <Products>{prodRows}</Products>
                  <Table>
                    <thead>
                      <tr>
                        <th>Precio</th>
                        <th>Enviar a</th>
                        <th>Número de orden</th>
                        <th>Fecha de pedido</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>${this.getSubtotal(products).toFixed(2)} MXN</td>
                        <td>
                          <p>
                            {Client.names} {Client.lastNames}
                          </p>
                          <p>
                            {Client.streetAndNumber}, {Client.neighborhood}{' '}
                          </p>
                          <p>
                            {Client.postalCode}, {Client.state}, {Client.city},{' '}
                            {Client.country}
                          </p>
                        </td>
                        <td>############</td>
                        <td>00/00/0000</td>
                      </tr>
                    </tbody>
                  </Table>
                  <MobileSummary>
                    <SummaryGallery
                      images={productPerOrder.map(p => p.displayImage)}
                      nextHandler={this.nextOrderHandler.bind(this)}
                      previousHandler={this.previousOrderHandler.bind(this)}
                    />
                    <MobileField>
                      <div>
                        <p>Producto</p>
                        <p>
                          ({ Cart.orders.length > 0 && Cart.orders[this.state.currentOrder].quantity })
                          {productPerOrder.length > 0 && productPerOrder[this.state.currentOrder].name}
                        </p>
                      </div>
                      <div>
                        <p>Precio</p>
                        <p>${this.getSubtotal(products).toFixed(2)} MXN</p>
                      </div>
                    </MobileField>
                    <MobileField>
                      <div>
                        <p>Enviar a</p>
                        <p>
                          {Client.names} {Client.lastNames}
                        </p>
                        <p>
                          {Client.streetAndNumber}, {Client.neighborhood}{' '}
                        </p>
                        <p>
                          {Client.postalCode}, {Client.state}, {Client.city},{' '}
                          {Client.country}
                        </p>
                      </div>
                    </MobileField>
                    <MobileField>
                      <div>
                        <p>Fecha de pedido</p>
                        <p>00/00/00000</p>
                      </div>
                      <div>
                        <p>Número de orden</p>
                        <p>###############</p>
                      </div>
                    </MobileField>
                  </MobileSummary>
                </OrderSummary>
                <Label>Detalles del pedido</Label>
                <OrderDetails>
                  <div>
                    <p>Dirección de envío</p>
                    <p>
                      {Client.names} {Client.lastNames}
                    </p>
                    <p>
                      {Client.streetAndNumber}, {Client.neighborhood}{' '}
                    </p>
                    <p>
                      {Client.postalCode}, {Client.state}, {Client.city},{' '}
                      {Client.country}
                    </p>
                  </div>
                  <div>
                    <p>Método de pago</p>
                    <p>##############</p>
                  </div>
                  <div>
                    <p>Resumen del pedido</p>
                    <SummaryField>
                      <p>Productos:</p>
                      <p>${this.getSubtotal(products).toFixed(2)}</p>
                    </SummaryField>
                    <SummaryField>
                      <p>Envío:</p>
                      <p>${shippingCost.toFixed(2)}</p>
                    </SummaryField>
                    <SummaryField>
                      <p>Subtotal:</p>
                      <p>
                        $
                        {(this.getSubtotal(products) + shippingCost).toFixed(2)}
                      </p>
                    </SummaryField>
                    <SummaryField>
                      <p>Total:</p>
                      <p>
                        $
                        {(this.getSubtotal(products) + shippingCost).toFixed(2)}
                      </p>
                    </SummaryField>
                  </div>
                </OrderDetails>
                <Button>Descargar Resumen</Button>
              </Container>
            </AppLayout>
          );
        }}
      />
    );
  }
}
export default Resumen;
