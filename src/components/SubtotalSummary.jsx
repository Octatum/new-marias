import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import { useProducts } from './CartContext';

const Summary = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SubtotalSummary = () => {
  const { subTotal } = useProducts();

  return (
    <Summary>
      <Text>SUBTOTAL</Text>
      <Text>${(subTotal / 100).toFixed(2)} MXN</Text>
    </Summary>
  );
};

export default SubtotalSummary;
