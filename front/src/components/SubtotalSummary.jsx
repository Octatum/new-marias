import React from 'react';
import styled from 'styled-components';
import device from '../utilities/device';
import Text from './Text';

const Summary = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SubtotalSummary = props => {
  const { products } = props;
  const productsSubtotal = products.reduce(
    (accum, product) => product.price * product.amount + accum,
    0
  );

  return (
    <Summary>
      <Text>SUBTOTAL</Text>
      <Text>${productsSubtotal.toFixed(2)} MXN</Text>
    </Summary>
  );
};

export default SubtotalSummary;
