import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Navbar from '../components/Navbar';
import Breadcrumb from './../components/Breadcrumb';
import BreadcrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import OrdersTable from './../components/OrdersTable';
import Cart from './../ShoppingCart';
import SubtotalSummary from './../components/SubtotalSummary';
import device from './../utilities/device';
import { Link } from 'gatsby';
import './../components/setup.css';

const AppLayout = styled.div`
  margin-bottom: 220px;
  padding-top: 190px;
  ${device.mobile} {
    width: 100%;
    padding-top: 95px;
  }
`;

const Container = styled.div`
  width: 75%;
  margin: 0 auto;
  padding-bottom: 40px;
  ${device.mobile} {
    width: 100%;
  }
`;

const Buttons = styled.div`
  button:first-child {
    display: none;
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
        <Navbar />
        <BreadcrumbContainer>
          <Breadcrumb>
            <BreadcrumbItem active>Carrito</BreadcrumbItem>
            <BreadcrumbItem>Información del cliente</BreadcrumbItem>
            <BreadcrumbItem>Envío</BreadcrumbItem>
            <BreadcrumbItem>Pago y facturación</BreadcrumbItem>
          </Breadcrumb>
        </BreadcrumbContainer>
        <Container>
          <OrdersTable
            orders={Cart.orders}
            deleteOrderHandler={this.deleteOrder}
            onDecreaseQuantity={this.decreaseQuantityHandler}
            onIncreaseQuantity={this.increaseQuantityHandler}
          />
          <SubtotalSummary/>
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
