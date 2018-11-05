import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import styled from 'styled-components';
import Breadcrumbs from './../components/Breadcrumbs';
import device from './../utilities/device';
import OrderSummary from './../components/OrderSummary';
import Client from './../ClientInfo';
import { Link } from 'gatsby';
import PayPalBtn from './../components/PayPalBtn';
import PayPalImg from './../components/assets/paypal.png';
import RadioButton from './../components/RadioButton';

const AppLayout = styled.div`
  margin-top: 190px;
  ${device.mobile} {
    margin-top: 110px;
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
  ${device.mobile} {
    padding: 5px 27px 5px 14px;
  }
  vertical-align: middle;
  h1 {
    align-self: center;
  }
  border: 1px solid #626363;
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
  font-size: 14px;
  /*
  > div {
    flex-grow: 5;
  }
  */
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

  input[type="radio"] {
    width: 22px;
    height: 22px;
    border: none;
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
  font-weight: bold;
  ${device.mobile} {
    margin-top: 30px;
  }
`;

const PayPalImage = styled.div`
  width: 123.6px;
  height: 30.2px;
  background-image: url(${PayPalImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`

class Pago extends Component {
  render() {
    return (
      <AppLayout>
        <Navbar />
        <BreadcrumbContainer>
          <Breadcrumbs>
            <div>Carrito</div>
            <div>Información del cliente</div>
            <div>Envío</div>
            <div active>Pago y facturación</div>
          </Breadcrumbs>
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
            <Field style={{paddingBottom: "25px"}}>
              <AddressContainer>
                <h1>Envío</h1>
                <h1>Estándar</h1>
              </AddressContainer>
              <button>Editar</button>
            </Field>
            <H4>Pagos y facturación</H4>
            <Field>
              <span style={{display: "flex"}}>
                <RadioButton name="pago"/>
                <PayPalImage style={{marginLeft: "15px"}}/>
              </span>
            </Field>

            {/* 
            <Input placeholder="Tarjeta de crédito" name="card" />
            <Input placeholder="Número de tarjeta" name="cardNumber" />
            <InputSmall
              placeholder="Nombre titular de la tarjeta"
              name="cardName"
            />
            <InputSmall placeholder="MM/AA" name="cardDate" />
            <InputSmall placeholder="CVV" name="cardCVV" />
            */}
            <H4>Dirección de facturación</H4>
            {/** 
              <Input name="facturacion" />
              <Input name="facturacion2" />
            */}
            <Field>
              <RadioButton name="direccion_fact"/>
            </Field>
            <Field style={{marginTop: "9px"}}>
              <RadioButton name="direccion_fact"/>
            </Field>
            <Link to="/envio">
              <BackButton> {'<'} Volver a Envío </BackButton>
            </Link>
            <Link to="/resumen">
              <Button>Finalizar Pedido</Button>
            </Link>
          </Info>
          <OrderSummary mobileHide/>
          <PayPalBtn/>
        </Container>
      </AppLayout>
    );
  }
}
export default Pago;
