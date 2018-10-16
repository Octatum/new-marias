import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import styled from 'styled-components';
import Breadcrumb from './../components/Breadcrumb';
import BreadcrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import device from './../utilities/device';
import OrderSummary from './../components/OrderSummary';

const AppLayout = styled.div`
    margin-top: 220px;
    ${device.mobile} {
        margin-top: 95px;
    }
`

const BreadcrumbContainer = styled.div`
  margin: 0 auto;
  width: 1240px;
  ${device.mobile} {
    margin-left: 16px;
  }
`;

const AddressContainer = styled.div`

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

const Info = styled.div`
    height: 400px;
    border: 2px solid gray;
    box-sizing: border-box;
`

class Envio extends Component {
    render() {
        return (
            <AppLayout>
                <Navbar/>
                <BreadcrumbContainer>
                    <Breadcrumb>
                        <BreadcrumbItem>Carrito</BreadcrumbItem>
                        <BreadcrumbItem>Información del cliente</BreadcrumbItem>
                        <BreadcrumbItem active>Envío</BreadcrumbItem>
                        <BreadcrumbItem>Pago y facturación</BreadcrumbItem>
                    </Breadcrumb>
                </BreadcrumbContainer>
                <Container>
                    <Info/>
                    <OrderSummary
                        quantity={5}
                        name={"Jarrón"}
                        price={700}
                        shipping={0}/>
                </Container>
            </AppLayout>
        );
    }
}
export default Envio;