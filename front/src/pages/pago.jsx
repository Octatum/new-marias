import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import styled from 'styled-components';
import Breadcrumb from './../components/Breadcrumb';
import BreadcrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import device from './../utilities/device';
import OrderSummary from './../components/OrderSummary';
import Client from './../ClientInfo';
import { Link } from 'gatsby';
import PayPalBtn from './../components/PayPalBtn';

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
    width: 20%;
    max-width: 80px;
    flex-shrink: 0;
  }
  h1:last-child {
    flex-grow: 0;
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
  > div {
    flex-grow: 5;
  }
  button {
    border: none;
    background-color: transparent;
    color: #626363;
    align-self: auto;
    :hover {
      cursor: pointer;
    }
    flex-shrink: 5;
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

const H4 = styled.div`
  margin: 14px 0;
  font-size: 20px;
  color: #626363;
  font-family: 'Archivo Narrow', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  height: 47px;
  border: solid 1px #626363;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 18px;
  font-style: italic;
  padding-left: 19px;
  margin: 9px 0;
`;

const InputSmall = styled.input`
  width: 26%;
  height: 47px;
  border: solid 1px #626363;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 18px;
  font-style: italic;
  float: left;
  padding-left: 19px;
  margin: 0 5px;
`;

class Pago extends Component {
  render() {
    return (
      <AppLayout>
        <Navbar />
        <BreadcrumbContainer>
         <Breadcrumb>
            <BreadcrumbItem item = {{name: "Carrito", to: "/carrito"}}/>
            <BreadcrumbItem item = {{name: "Información del cliente", to: "/cliente"}}/>
            <BreadcrumbItem item = {{name: "Envío", to: "/envio"}}/>
            <BreadcrumbItem item = {{name: "Pago y facturación", to: "/pago"}} active/>
          </Breadcrumb>
        </BreadcrumbContainer>
        <Container>
          <Info>
            <Field style={{borderBottom: "none"}}>
              <AddressContainer>
                <h1>Direccion de envío</h1>
                <h1>
                  {Client.streetAndNumber}, {Client.neighborhood}, {Client.city}
                  , {Client.state}, {Client.country}
                </h1>
              </AddressContainer>
              <button>Editar</button>
            </Field>
            <Field>
              <AddressContainer>
                <h1>Envío</h1>
                <h1>Estándar</h1>
              </AddressContainer>
              <button>Editar</button>
            </Field>

            <H4>Pagos y facturación</H4>
            <Input placeholder="Tarjeta de crédito" name="card" />
            <Input placeholder="Número de tarjeta" name="cardNumber" />

            <InputSmall
              placeholder="Nombre titular de la tarjeta"
              name="cardName"
            />
            <InputSmall placeholder="MM/AA" name="cardDate" />
            <InputSmall placeholder="CVV" name="cardCVV" />

            <H4>Dirección de facturación</H4>
            <Input name="facturacion" />
            <Input name="facturacion2" />
            <Link to="/envio">
              <BackButton> {'<'} Volver a Envío </BackButton>
            </Link>
            <Link to="/resumen">
              <Button>Finalizar Pedido</Button>
            </Link>
          </Info>
          <OrderSummary mobileHide />
          <PayPalBtn />
        </Container>
      </AppLayout>
    );
  }
}
export default Pago;
