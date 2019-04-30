import React from 'react';
import styled from 'styled-components';
import device from './../../utilities/device';
import Text from '../Text';
import OrderRow from './OrderRow';

const ContentTable = styled('section')`
  display: flex;
  flex-direction: column;
`;

const TableHead = styled('div')`
  display: flex;
  padding: 1em 0.5em;
  margin-top: 1em;
  justify-content: space-evenly;
  background-color: ${({ theme }) => theme.colors.pink};
`;

const FlexCell = styled('div')`
  flex: ${({ flex }) => flex || 4};
`;

const TableBody = styled('div')`
  display: flex;
  flex-direction: column;
`;

const DesktopText = styled(Text)`
  ${device.tablet} {
    opacity: 0;
  }
`;

const OrdersTable = props => {
  const { products } = props;

  return (
    <ContentTable>
      <TableHead>
        <FlexCell>
          <DesktopText align="center" size={2} color="white">
            Producto
          </DesktopText>
        </FlexCell>
        <FlexCell>
          <DesktopText align="center" size={2} color="white">
            Nombre
          </DesktopText>
        </FlexCell>
        <FlexCell>
          <DesktopText align="center" size={2} color="white">
            Precio
          </DesktopText>
        </FlexCell>
        <FlexCell>
          <DesktopText align="center" size={2} color="white">
            Cantidad
          </DesktopText>
        </FlexCell>
        <FlexCell>
          <DesktopText align="center" size={2} color="white">
            Total
          </DesktopText>
        </FlexCell>
        <FlexCell flex={1} />
      </TableHead>
      <TableBody>
        {products.map(product => (
          <OrderRow product={product} key={product.sku} {...props} />
        ))}
      </TableBody>
    </ContentTable>
  );
};

export default OrdersTable;
