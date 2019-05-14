import React from 'react';
import styled from 'styled-components';
import device from './../../utilities/device';
import Text from '../Text';
import OrderRow from './OrderRow';
import { useProducts } from '../CartContext';

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

const OrdersTable = () => {
  const { products, updateQuantity, removeFromCart } = useProducts();

  const sortedProducts = products.sort(
    (a, b) => a.name.toLowerCase() < b.name.toLowerCase()
  );

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
        {sortedProducts.map(product => (
          <OrderRow
            product={product}
            updateQuantity={updateQuantity}
            removeProduct={removeFromCart}
            key={product.name}
          />
        ))}
      </TableBody>
    </ContentTable>
  );
};

export default OrdersTable;
