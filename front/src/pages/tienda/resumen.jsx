import React from 'react';
import styled from 'styled-components';
import { StaticQuery, graphql } from 'gatsby';

import device from '../../utilities/device';
import Cart from '../../ShoppingCart';
import Text from '../../components/Text';
import AppLayout from '../../components/AppLayout';

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
  :hover {
    cursor: pointer;
  }
  ${device.mobile} {
    width: 70%;
  }
`;

const query = graphql`
  query {
    allCockpitProduct {
      edges {
        node {
          fields {
            slug
          }
          id
          entry {
            description
            price
            name
            thumbnail {
              path
            }
            gallery {
              value {
                color
                images {
                  path
                }
              }
            }
          }
        }
      }
    }
  }
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2em 12%;
  > * {
    margin-bottom: 2rem;
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

const Summary = function() {
  const todayDate = new Date();
  const formattedDated = todayDate.toLocaleDateString('es-MX');

  return (
    <AppLayout>
      <Layout>
        <Text as="h2" size={4}>
          Tu pedido con New Marías
        </Text>
        <OrderSummary>
          <TableRow>
            <FlexCell flex={1}>
              <FlexCellHeader>Número de orden</FlexCellHeader>
              <Text>#########</Text>
            </FlexCell>
            <FlexCell flex={2}>
              <FlexCellHeader>Enviar a</FlexCellHeader>
              <Text>Dirección de envío</Text>
            </FlexCell>
            <FlexCell flex={1}>
              <FlexCellHeader>Fecha de pedido</FlexCellHeader>
              <Text>{formattedDated}</Text>
            </FlexCell>
          </TableRow>
          <StaticQuery
            query={query}
            render={data => {
              const products = data.allCockpitProduct.edges.map(
                edge => edge.node
              );
              return Cart.orders.map((o, index) => {
                const prod = products.find(p => o.productId === p.id);
                return (
                  <TableRow>
                    <FlexCell flex={1}>
                      <Img src={prod.entry.thumbnail.path} />
                    </FlexCell>
                    <FlexCell flex={2}>
                      <FlexCellHeader>Producto</FlexCellHeader>
                      <Text>
                        ({o.quantity}) {prod.entry.name}
                      </Text>
                    </FlexCell>
                    <FlexCell flex={1}>
                      <FlexCellHeader>Precio</FlexCellHeader>
                      <Text>$500.00</Text>
                    </FlexCell>
                  </TableRow>
                );
              });
            }}
          />
        </OrderSummary>
        <Text as="h3" size={2} color="palebrown">
          Detalles del pedido
        </Text>
        <DetailTable>
          <TableRow>
            <FlexCell flex={1}>
              <FlexCellHeader>Método de pago</FlexCellHeader>
              <Text>###########</Text>
            </FlexCell>
            <FlexCell flex={2}>
              <FlexCellHeader>Dirección de facturación</FlexCellHeader>
              <Text>Dirección</Text>
            </FlexCell>
            <FlexCell flex={1}>
              <FlexCellHeader>Resumen de pago</FlexCellHeader>
              <Text>Subtotal: $500.00</Text>
              <Text>Envío: $0.00</Text>
              <Text>Subtotal: $500.00</Text>
              <Text>Total: $500.00</Text>
            </FlexCell>
          </TableRow>
        </DetailTable>
        <ButtonLayout>
          <Button>
            <Text size={3} color="white">
              Descargar Resumen
            </Text>
          </Button>
        </ButtonLayout>
      </Layout>
    </AppLayout>
  );
};

export default Summary;
