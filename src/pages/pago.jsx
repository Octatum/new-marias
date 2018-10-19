import React from 'react';
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Breadcrumb from "./../components/Breadcrumb";
import BreadcrumbItem from "./../components/Breadcrumb/BreadcrumbItem";

const AppLayout = styled.div`
  padding-top: 220px;
  display: flex;
  flex-direction: column;
`;

const BreadcrumbContainer = styled.div`
  margin: 0 auto;
  width: 1240px;
  /*margin-top: 220px;*/
`;

const DatosFacturacion = styled.div`
  width: 50%;
`;

const Container = styled.div`
  margin-left: 11%;
`;

const Table = styled.table`

`;

const H4 = styled.div `
  font-size: 20px;
  color: #626363;
  font-family: 'Archivo Narrow', sans-serif;
`;

const Input = styled.input `
  width: 575px;
  height: 47px;
  border: solid 1px #626363;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 18px;
  font-style: italic;
  ::placeholder {
    padding-left: 19px;
  }
`;

const InputContainer = styled.div `
  width: 100%;
  float: left;
`;

const InputSmall = styled.input `
  width: 210px;
  height: 47px;
  border: solid 1px #626363;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 18px;
  font-style: italic;
  float: left;
  margin: 0 5px 0 0;

  ::placeholder {
    padding-left: 19px;
  }
`;

const Pago = () => (
    <AppLayout>
        <Navbar/>
        <BreadcrumbContainer>
            <Breadcrumb>
                <BreadcrumbItem>Carrito</BreadcrumbItem>
                <BreadcrumbItem>Información del cliente</BreadcrumbItem>
                <BreadcrumbItem>Envío</BreadcrumbItem>
                <BreadcrumbItem active>Pago y facturación</BreadcrumbItem>
            </Breadcrumb>
        </BreadcrumbContainer>
        <DatosFacturacion>
          <Container>
            <Table>
              <tr>
                <td>Dirección de envío</td>
                <td>Loma Grande #2709, Lomas de San Francisco, Monterrey, N.L., México</td>
                <td>Editar</td>
              </tr>
              <tr>
                <td>Envío</td>
                <td>Estándar</td>
                <td>Editar</td>
              </tr>
            </Table>
            <H4>Pagos y facturación</H4>
            <Input placeholder="Tarjeta de crédito" name="card"></Input>
            <Input placeholder="Número de tarjeta" name="cardNumber"></Input>
            <InputContainer>
              <InputSmall placeholder="Nombre titular de la tarjeta" name="cardName"></InputSmall>
              <InputSmall placeholder="MM/AA" name="cardDate"></InputSmall>
              <InputSmall placeholder="CVV" name="cardCVV"></InputSmall>
            </InputContainer>
            <H4>Dirección de facturación</H4>
            <Input name="facturacion"></Input>
            <Input name="facturacion2"></Input>
            </Container>
          </DatosFacturacion>
    </AppLayout>
);
export default Pago;
