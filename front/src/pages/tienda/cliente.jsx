import React, { Component } from 'react';
import { Link } from 'gatsby';

import Navbar from '../../components/Navbar';
import styled from 'styled-components';
import Breadcrumbs from '../../components/Breadcrumbs';
import device from '../../utilities/device';
import OrderSummary from '../../components/OrderSummary';
import Client from '../../ClientInfo';

const AppLayout = styled.div`
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

const Info = styled.div`
  border-right: 2px solid #cccccc;
  box-sizing: border-box;
  padding: 20px 5%;
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
      border:none;
    }
    > div:nth-child(2) {
      width: 0%;
    } 
  }
`;

const Label = styled.label`
  padding-bottom: 19px !important;
  font-size: 18px;
  color: #626363;
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: bold;
`;

const InputRow = styled.div`
  width: 100%;
  height: 35px;
  display: flex;
  flex-direction: row;
  margin-bottom: 9px;
  > input,
  > select {
    flex-grow: 1;
    margin: 0 5px;
    min-width: 0;
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 18px;
    padding-left: 19px;
    ::placeholder {
      font-style: italic;
    }
  }

  > select {
    flex-grow: 10;
    width: auto;
    display: block;
  }

  > input:first-child {
    margin-left: 0;
  }
  > input:last-child {
    margin-right: 0;
  }
  ${device.mobile} {
    flex-wrap: ${({ breakdown }) => (breakdown ? 'wrap' : 'no-wrap')};
    > input,
    > select {
      width: ${({ breakdown }) => (breakdown ? '100%' : '33%')};
    }
    > input {
      margin: 0;
    }
    > input:not(:last-child) {
      margin-bottom: 10px;
    }
    > select {
      margin-bottom: ${({ breakdown }) => (breakdown ? '9px' : '0px')};
    }
    margin-bottom: ${({ breakdown }) => (breakdown ? '47px' : '10px')};
  }
`;

const Fieldset = styled.div`
  margin-top: 10px;
`;

const Button = styled.button`
  height: 50px;
  width: 37%;
  border: none;
  background-color: #d4ad9f;
  color: #ffffff;
  float: right;
  margin-top: 29px;
  margin-bottom: 100px;
  font-size: 18px;
  :hover {
    cursor: pointer;
  }
`;

const BackButton = styled.button`
  margin-top: 43px;
  border: none;
  background: transparent;
  font-family: 'Archivo Narrow', sans-serif;
  color: #626363;
  font-size: 14px;
  :hover {
    cursor: pointer;
  }
`;

class Cliente extends Component {
  componentDidMount() {
    this.renderCustomerInfo();
  }

  saveCustomerInfo = () => {
    Client.names = document.getElementById('names').value;
    Client.lastNames = document.getElementById('lastNames').value;
    Client.email = document.getElementById('email').value;
    Client.streetAndNumber = document.getElementById('streetAndNumber').value;
    Client.neighborhood = document.getElementById('neighborhood').value;
    Client.city = document.getElementById('city').value;
    Client.country = document.getElementById('country').value;
    Client.state = document.getElementById('state').value;
    Client.postalCode = document.getElementById('postalCode').value;
    Client.tel = document.getElementById('tel').value;
  };

  renderCustomerInfo = () => {
    document.getElementById('names').value = Client.names;
    document.getElementById('lastNames').value = Client.lastNames;
    document.getElementById('email').value = Client.email;
    document.getElementById('streetAndNumber').value = Client.streetAndNumber;
    document.getElementById('neighborhood').value = Client.neighborhood;
    document.getElementById('city').value = Client.city;
    document.getElementById('country').value = Client.country;
    document.getElementById('state').value = Client.state;
    document.getElementById('postalCode').value = Client.postalCode;
    document.getElementById('tel').value = Client.tel;
  };

  render() {
    return (
      <AppLayout>
        <Navbar />
        <BreadcrumbContainer>
          <Breadcrumbs>
            <div>Carrito</div>
            <div active>Información del cliente</div>
            <div>Envío</div>
            <div>Pago y facturación</div>
          </Breadcrumbs>
        </BreadcrumbContainer>
        <Container>
          <Info>
            <Label>Información de contacto</Label>
            <Fieldset style={{ marginBottom: '30px' }}>
              <InputRow>
                <input
                  name="email"
                  id="email"
                  placeholder="Correo electrónico"
                />
              </InputRow>
            </Fieldset>
            <Label>Dirección de envío</Label>
            <Fieldset>
              <InputRow breakdown>
                <input
                  autoComplete="given-name"
                  id="names"
                  placeholder="Nombre (s)"
                />
                <input
                  autoComplete="family-name"
                  id="lastNames"
                  placeholder="Apellidos"
                />
              </InputRow>
              <InputRow>
                <input
                  autoComplete="street-address"
                  id="streetAndNumber"
                  placeholder="Calle y número"
                />
              </InputRow>
              <InputRow>
                <input
                  autoComplete="address-line3"
                  id="neighborhood"
                  placeholder="Colonia"
                />
              </InputRow>
              <InputRow>
                <input
                  autoComplete="address-line2"
                  id="city"
                  placeholder="Ciudad"
                />
              </InputRow>
              <InputRow>
                <select
                  autoComplete="country"
                  name="country"
                  id="country"
                  style={{ marginLeft: '0' }}
                >
                  <option disabled>Pais</option>
                  <option>México</option>
                  <option>EU</option>
                </select>
                <select autoComplete="address-line1" name="state" id="state">
                  <option disabled>Estado</option>
                  <option>Nuevo León</option>
                  <option>Sonora</option>
                </select>
                <input
                  autoComplete="postal-code"
                  name="zipcode"
                  id="postalCode"
                  placeholder="Código Postal"
                />
              </InputRow>
              <InputRow>
                <input
                  autoComplete="tel-national"
                  name="phone"
                  id="tel"
                  placeholder="Teléfono"
                />
              </InputRow>
            </Fieldset>
            <Link to="/carrito">
              <BackButton> {'<'} Volver a carrito</BackButton>
            </Link>
            <Link to="/envio">
              <Button onClick={this.saveCustomerInfo}>Continuar</Button>
            </Link>
          </Info>
          <OrderSummary mobileHide />
        </Container>
      </AppLayout>
    );
  }
}
export default Cliente;
