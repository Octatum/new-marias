import React from 'react';
import styled from 'styled-components';
import Text from './Text';

const Summary = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SubtotalSummary = ({ totalPrice }) => {
  return (
    <Summary>
      <Text>SUBTOTAL</Text>
      <Text>${totalPrice} MXN</Text>
    </Summary>
  );
};

export default SubtotalSummary;
