import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Breadcrumbs from './../components/Breadcrumbs';
import OrdersTable from './../components/OrdersTable';
import Cart from './../ShoppingCart';
import SubtotalSummary from './../components/SubtotalSummary';
import device from './../utilities/device';
import { Link } from 'gatsby';
import AppLayout from '../components/AppLayout';

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-bottom: 40px;
  ${device.mobile} {
    width: 100%;
  }
`;

const BreadcrumbContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding-left: 0%;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: block;
  button {
    background-color: #d4ad9f;
    border: none;
    height: 40px;
    margin: 5px 0;
    color: #ffffff;
    font-size: 18px;
    float: right;
    width: ${props => props.width}px;
    :hover {
      cursor: pointer;
    }
    ${device.mobile} {
      margin-right: 33px;
      display: ${({ mobileHide }) => (mobileHide ? 'none' : 'block')};
    }
  }
  ::after {
    content: '';
    clear: both;
    display: table;
  }
`;

class Carrito extends Component {
  deleteOrder = index => {
    Cart.deleteOrder(index);
    Cart.decrement();
  };

  decreaseQuantityHandler(index) {
    Cart.decreaseQuantity(index);
  }

  increaseQuantityHandler(index) {
    Cart.increaseQuantity(index);
  }

  render() {
    return (
      <AppLayout>
        <BreadcrumbContainer>
          <Breadcrumbs items={[]}>
            <div active>Carrito</div>
            <div>Información del cliente</div>
            <div>Envío</div>
            <div>Pago y facturación</div>
          </Breadcrumbs>
        </BreadcrumbContainer>
        <Container>
          <OrdersTable
            orders={Cart.orders}
            deleteOrderHandler={this.deleteOrder}
            onDecreaseQuantity={this.decreaseQuantityHandler}
            onIncreaseQuantity={this.increaseQuantityHandler}
          />

          <SubtotalSummary />

          <ButtonContainer width={115} mobileHide>
            <Link to="/">
              <button>Regresar</button>
            </Link>
          </ButtonContainer>
          <ButtonContainer width={156}>
            <Link to="/cliente">
              <button>Continuar</button>
            </Link>
          </ButtonContainer>
        </Container>
      </AppLayout>
    );
  }
}
export default observer(Carrito);
