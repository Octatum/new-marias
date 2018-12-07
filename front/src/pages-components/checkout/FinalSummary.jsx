import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import device from '../../utilities/device';
import Text from '../../components/Text';
import { CartConsumer } from '../../components/CartContext';
import paymentOptions from './paymentOptions';

const Img = styled.div`
  width: 90px;
  height: 90px;
  background-color: #c4c4c4;
  display: block;
  background: url(https://admin.newmarias.com/${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Button = styled.button`
  height: 50px;
  width: 20%;
  border: none;
  background-color: #d4ad9f;
  color: #ffffff;
  ${device.mobile} {
    width: 70%;
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em 12%;
  > * {
    margin-bottom: 2rem;
  }

  ${device.tablet} {
    padding: 2em 5%;
  }
`;

const ButtonLayout = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  justify-content: flex-end;
`;

const OrderSummary = styled('div')`
  --table-padding: 1.5rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: var(--table-padding);
  background-color: ${({ theme }) => theme.colors.lightgray};
  box-sizing: border-box;

  > :not(:last-child) {
    margin-bottom: var(--table-padding);
  }
`;

const TableRow = styled('div')`
  display: flex;
`;

const FlexCell = styled('div')`
  display: flex;
  flex-direction: column;
  flex: ${({ flex }) => flex};
`;

const FlexCellHeader = styled(Text)`
  margin-bottom: 1rem;
`;

const DetailTable = styled('div')`
  display: grid;
  box-sizing: border-box;
  width: 100%;
  padding: 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.darkgray};
`;

const MobileTableRow = styled(TableRow)`
  ${device.tablet} {
    flex-direction: column;
    > * {
      margin-bottom: 1rem;
    }
  }
`;

const FinalSummary = function(props) {
  const todayDate = new Date();
  const formattedDated = todayDate.toLocaleDateString('es-MX');
  const { customerAddress, selectedShipping } = props;
  const selectedPaymentOption = paymentOptions.find(p => p.id === props.pago);
  console.log(props);
  console.log(selectedPaymentOption);

  return (
    <CartConsumer>
      {({ products }) => {
        const productSubtotal = products.reduce(
          (accum, prod) => prod.price * prod.amount + accum,
          0
        );

        return (
          <Layout>
            <Helmet title="Resumen de compra" />
            <Text as="h2" size={4}>
              Tu pedido con New Marías
            </Text>
            <OrderSummary>
              <TableRow>
                <FlexCell flex={1}>
                  <FlexCellHeader>Resumen de compra</FlexCellHeader>
                  <Text />
                </FlexCell>
                <FlexCell flex={2}>
                  <FlexCellHeader>Enviar a</FlexCellHeader>
                  <Text>
                    {customerAddress.street}, {customerAddress.suburb},{' '}
                    {customerAddress.city}, {customerAddress.state},{' '}
                    {customerAddress.country}
                  </Text>
                </FlexCell>
                <FlexCell flex={1}>
                  <FlexCellHeader>Fecha de pedido</FlexCellHeader>
                  <Text>{formattedDated}</Text>
                </FlexCell>
              </TableRow>
              {products.map(product => (
                <TableRow>
                  <FlexCell flex={1}>
                    <Img src={product.thumbnail} />
                  </FlexCell>
                  <FlexCell flex={2}>
                    <FlexCellHeader>Producto</FlexCellHeader>
                    <Text>
                      ({product.amount}) {product.name}
                    </Text>
                  </FlexCell>
                  <FlexCell flex={1}>
                    <FlexCellHeader>Precio por unidad</FlexCellHeader>
                    <Text>${parseFloat(product.price).toFixed(2)}</Text>
                  </FlexCell>
                </TableRow>
              ))}
            </OrderSummary>
            <Text as="h3" size={2} color="palebrown">
              Detalles del pedido
            </Text>
            <DetailTable>
              <MobileTableRow>
                <FlexCell flex={1}>
                  <FlexCellHeader>Método de pago</FlexCellHeader>
                  <Text>{selectedPaymentOption.name}</Text>
                </FlexCell>
                <FlexCell flex={2}>
                  <FlexCellHeader>Dirección de facturación</FlexCellHeader>
                  <Text>
                    {customerAddress.street}, <br />
                    {customerAddress.suburb}, <br />
                    {customerAddress.city}, <br />
                    {customerAddress.state}, {customerAddress.country}
                  </Text>
                </FlexCell>
                <FlexCell flex={1}>
                  <FlexCellHeader>Resumen de pago</FlexCellHeader>
                  <Text>
                    Subtotal: ${parseFloat(productSubtotal).toFixed(2)}
                  </Text>
                  <Text>
                    Envío: ${parseFloat(selectedShipping.price).toFixed(2)}
                  </Text>
                  <Text>
                    Total: $
                    {parseFloat(
                      productSubtotal + selectedShipping.price
                    ).toFixed(2)}
                  </Text>
                </FlexCell>
              </MobileTableRow>
            </DetailTable>
            <ButtonLayout>
              <Button>
                <Text size={3} color="white">
                  Finalizar
                </Text>
              </Button>
            </ButtonLayout>
          </Layout>
        );
      }}
    </CartConsumer>
  );
};

export default FinalSummary;
