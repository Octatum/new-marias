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
  background-color: ${({ theme }) => theme.colors.palebrown};
`;

const FlexCell = styled('div')`
  flex: ${({ flex }) => flex || 4};
`;

const TableBody = styled('div')`
  display: flex;
  flex-direction: column;
`;

const OrdersTable = props => {
  const { products } = props;

  return (
    <ContentTable>
      <TableHead>
        <FlexCell>
          <Text align="center" size={2} color="white">
            Producto
          </Text>
        </FlexCell>
        <FlexCell>
          <Text align="center" size={2} color="white">
            Nombre
          </Text>
        </FlexCell>
        <FlexCell>
          <Text align="center" size={2} color="white">
            Precio
          </Text>
        </FlexCell>
        <FlexCell>
          <Text align="center" size={2} color="white">
            Cantidad
          </Text>
        </FlexCell>
        <FlexCell>
          <Text align="center" size={2} color="white">
            Total
          </Text>
        </FlexCell>
        <FlexCell flex={1} />
      </TableHead>
      <TableBody>
        {products.map(product => (
          <OrderRow product={product} {...props} />
        ))}
      </TableBody>
    </ContentTable>
  );
};

export default OrdersTable;
