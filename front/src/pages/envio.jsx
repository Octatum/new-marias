import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import styled from 'styled-components';
import Breadcrumb from './../components/Breadcrumb';
import BreadcrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import device from './../utilities/device';
import OrderSummary from './../components/OrderSummary';
import Client from './../ClientInfo';
import { Link } from 'gatsby';

const AppLayout = styled.div`
  margin-top: 190px;
  ${device.mobile} {
    margin-top: 95px;
  }
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
`;

const BreadcrumbContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  padding-left: 0%;
`;

const AddressContainer = styled.div`
  h1:first-child {
    font-weight: bold;
    margin-right: 15px;
  }
  display: flex;
  width: 70%;
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  box-sizing: border-box;
  > div {
    float: left;
  }
  > div:nth-child(1) {
    width: 60%;
  }
  > div:nth-child(2) {
    width: 40%;
  }
  ${device.mobile} {
    width: 95%;
    > div:nth-child(1) {
      width: 100%;
      border: none;
    }
    > div:nth-child(2) {
      width: 0%;
    }
  }
`;

const Button = styled.button`
  height: 50px;
  width: 37%;
  border: none;
  background-color: #d4ad9f;
  color: #ffffff;
  float: right;
  margin-top: 70px;
  margin-bottom: 100px;
  font-size: 18px;
  :hover {
    cursor: pointer;
  }
`;

const Info = styled.div`
  border-right: 2px solid #cccccc;
  box-sizing: border-box;
  padding: 70px 5%;
  ${device.mobile} {
    padding: 54px 5%;
  }
`;

const Input = styled.input`
  border: none;
  background-color: white;
  height: 22px;
  width: 22px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 14px 27px 14px 14px;
  vertical-align: middle;
  h1 {
    align-self: center;
  }
  border: 1px solid #626363;
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
  font-size: 14px;
  button {
    border: none;
    background-color: transparent;
    color: #626363;
    align-self: auto;
    :hover {
      cursor: pointer;
    }
  }
`;

const Envios = styled.div`
  margin-top: 70px;
  > div:not(:last-child) {
    border-bottom: none;
  }
  ${device.mobile} {
    margin-top: 37px;
  }
`;

const BackButton = styled.button`
  margin-top: 54px;
  border: none;
  background: transparent;
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
  font-size: 14px;
  :hover {
    cursor: pointer;
  }
  ${device.mobile} {
    margin-top: 18px;
  }
`;

const shippingOptions = [{ id: 1, price: 800 }, { id: 2, price: 1000 }];

class Envio extends Component {
  render() {
    const envios = shippingOptions.map((ship, index) => (
      <Field key={ship.id}>
        <div style={{ display: 'flex' }}>
          <Input type="radio" name="envio" />
          <h1 style={{ marginLeft: '20px' }}>Envío {index + 1}</h1>
        </div>
        <h1>${ship.price.toFixed(2)}</h1>
      </Field>
    ));
    return (
      <AppLayout>
        <Navbar />
        <BreadcrumbContainer>
          <Breadcrumb>
            <BreadcrumbItem>Carrito</BreadcrumbItem>
            <BreadcrumbItem>Información del cliente</BreadcrumbItem>
            <BreadcrumbItem active>Envío</BreadcrumbItem>
            <BreadcrumbItem>Pago y facturación</BreadcrumbItem>
          </Breadcrumb>
        </BreadcrumbContainer>
        <Container>
          <Info>
            <Field>
              <AddressContainer>
                <h1>Direccion de envío</h1>
                <h1>
                  {Client.streetAndNumber}, {Client.neighborhood}, {Client.city}
                  , {Client.state}, {Client.country}
                </h1>
              </AddressContainer>
              <button>Editar</button>
            </Field>
            <Envios>{envios}</Envios>
            <Link to="/cliente">
              <BackButton> {'<'} Volver a información de cliente</BackButton>
            </Link>
            <Link to="/resumen">
              <Button>Continuar</Button>
            </Link>
          </Info>
          <OrderSummary mobileHide />
        </Container>
      </AppLayout>
    );
  }
}
export default Envio;
