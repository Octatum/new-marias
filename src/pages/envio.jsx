import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import styled from 'styled-components';
import Breadcrumb from './../components/Breadcrumb';
import BreadcrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import device from './../utilities/device';

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
                
            </AppLayout>
        );
    }
}
export default Envio;