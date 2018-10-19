import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import styled from 'styled-components';
import Breadcrumb from './../components/Breadcrumb';
import BreadcrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import device from './../utilities/device';
import OrderSummary from './../components/OrderSummary';
import { StaticQuery, graphql } from 'gatsby';
import Cart from './../ShoppingCart';
import { Link } from 'gatsby';

const AppLayout = styled.div`
  padding-top: 220px;
  padding-bottom: 500px;
  ${device.mobile} {
    width: 100%;
    padding-top: 95px;
  }
`;

const BreadcrumbContainer = styled.div`
  margin: 0 auto;
  width: 1240px;
  ${device.mobile} {
    margin-left: 16px;
  }
`;

const Info = styled.div`
    border-right: 2px solid #cccccc;
    box-sizing: border-box;
    padding: 20px 5%;
`

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
`

const Label = styled.label`
    padding-bottom: 19px!important;
    font-size: 18px;
    color: #626363;
    font-family: 'Archivo Narrow', sans-serif;
    font-weight: bold;
`

const InputRow = styled.div`
    width: 100%;
    height: 35px;
    display: flex;
    flex-direction: row;
    margin-bottom: 9px;
    > input, > select {
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
        option {
            display: 10px!important;
        }
    }
    > input:first-child {
        margin-left: 0;
    }
    > input:last-child {
        margin-right: 0;
    }
`

const Fieldset = styled.div`
    margin-top: 10px;
`

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
`

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
`

const Cliente = () => (
    <AppLayout>
        <Navbar />
        <BreadcrumbContainer>
          <Breadcrumb>
            <BreadcrumbItem>Carrito</BreadcrumbItem>
            <BreadcrumbItem active>Información del cliente</BreadcrumbItem>
            <BreadcrumbItem>Envío</BreadcrumbItem>
            <BreadcrumbItem>Pago y facturación</BreadcrumbItem>
          </Breadcrumb>
        </BreadcrumbContainer>
        <Container>
            <Info>
                <Label>Información de contacto</Label>
                <Fieldset style={{marginBottom: '30px'}}>
                    <InputRow>
                        <input placeholder="Correo electrónico"/>
                    </InputRow>
                </Fieldset>
                <Label>Dirección de envío</Label>
                <Fieldset>
                    <InputRow>
                        <input placeholder="Nombre (s)"/>
                        <input placeholder="Apellidos" />
                    </InputRow>
                    <InputRow>
                        <input placeholder="Calle y número"/>
                    </InputRow>
                    <InputRow>
                        <input placeholder="Colonia"/>
                    </InputRow>
                    <InputRow>
                        <input placeholder="Ciudad"/>
                    </InputRow>
                    <InputRow>
                        <select style={{marginLeft: '0'}}>
                            <option>Pais</option>
                        </select>
                        <select>
                            <option>Estado</option>
                        </select>
                        <input placeholder="Código Postal"/>
                    </InputRow>
                    <InputRow>
                        <input placeholder="Teléfono"/>
                    </InputRow>
                </Fieldset>
                <Link to="/carrito">
                    <BackButton> {"<"} Volver a carrito</BackButton>
                </Link>
                <Link to="/envio">
                    <Button>Continuar</Button>
                </Link>
            </Info>
            <OrderSummary/>
        </Container>
    </AppLayout>
);
export default Cliente;