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

const PropsDesktopText = ({ children, ...rest }) => {
  return (
    <DesktopText align="center" size={2} color="white" {...rest}>
      {children}
    </DesktopText>
  );
};

const OrdersTable = ({ products, removeItem, updateItem }) => {
  const sortedProducts = products.sort(
    (a, b) => a.title.toLowerCase() < b.title.toLowerCase()
  );

  return (
    <ContentTable>
      <TableHead>
        <FlexCell>
          <PropsDesktopText>Producto</PropsDesktopText>
        </FlexCell>
        <FlexCell>
          <PropsDesktopText>Nombre</PropsDesktopText>
        </FlexCell>
        <FlexCell>
          <PropsDesktopText>Precio</PropsDesktopText>
        </FlexCell>
        <FlexCell>
          <PropsDesktopText>Cantidad</PropsDesktopText>
        </FlexCell>
        <FlexCell>
          <PropsDesktopText>Total</PropsDesktopText>
        </FlexCell>
        <FlexCell flex={1} />
      </TableHead>
      <TableBody>
        {sortedProducts.map(product => (
          <OrderRow
            product={product}
            updateQuantity={updateItem}
            removeProduct={removeItem}
            key={product.id}
          />
        ))}
      </TableBody>
    </ContentTable>
  );
};

export default OrdersTable;
