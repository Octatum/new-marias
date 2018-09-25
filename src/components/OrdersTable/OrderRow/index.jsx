import React from 'react';
import styled from 'styled-components';
import QuantityControls from './QuantityControls';

const Picture = styled.div`
  width: 165px;
  height: 165px;
  background-color: #c4c4c4;
  margin: 0 auto;
`;

const Td = styled.td`
  padding: 14px;
  color: #626363;
  font-size: 16px;
  text-align: center;
  vertical-align: middle;
`;

const DeleteButton = styled.button`
  border: none;
  background: transparent;
  color: #626363;
  :hover {
    cursor: pointer;
  }
`;

const OrderRow = ({
  name,
  price,
  quantity,
  deleteOrderHandler,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) => (
  <tr>
    <Td>
      <Picture />
    </Td>
    <Td>{name}</Td>
    <Td>${price.toFixed(2)} MXN</Td>
    <Td>
      <QuantityControls
        quantity={quantity}
        onDecreaseQuantity={onDecreaseQuantity}
        onIncreaseQuantity={onIncreaseQuantity}
      />
    </Td>
    <Td>${price.toFixed(2) * quantity} MXN</Td>
    <Td>
      <DeleteButton onClick={() => deleteOrderHandler()}>x</DeleteButton>
    </Td>
  </tr>
);

export default OrderRow;
