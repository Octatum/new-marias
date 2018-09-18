import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Breadcrumb from "./../components/Breadcrumb";
import BreadcrumbItem from "./../components/Breadcrumb/BreadcrumbItem";
import ProductsTable from "./../components/ProductsTable";

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const BreadcrumbContainer = styled.div`
  margin: 0 auto;
  width: 1240px;
`;

const Carrito = () => (
    <AppLayout>
        <Navbar/>
        <BreadcrumbContainer>
            <Breadcrumb>
                <BreadcrumbItem active>Carrito</BreadcrumbItem>  
                <BreadcrumbItem>Información del cliente</BreadcrumbItem>  
                <BreadcrumbItem>Envío</BreadcrumbItem>  
                <BreadcrumbItem>Pago y facturación</BreadcrumbItem>  
            </Breadcrumb>
        </BreadcrumbContainer>
        <ProductsTable/>
    </AppLayout>
);
export default Carrito;