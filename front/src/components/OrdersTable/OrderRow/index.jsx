import React from 'react';
import styled from 'styled-components';
import QuantityControls from './QuantityControls';
import { observer } from 'mobx-react';
import device from './../../../utilities/device';

const Tr = styled.tr`
  ${device.mobile} {
    td {
      width: 40%;
      padding: 16px 0;
    }
    td:nth-child(6) {
      width: 20%;
    }
    td:nth-child(2),
    td:nth-child(3),
    td:nth-child(5) {
      display: none;
    }
    td:nth-child(4) {
      margin: 0;
    }
  }
`;

const MobileResume = styled.div`
  display: none;
  text-align: left;
  p {
    display: block;
    margin: 10px 0;
  }
  p:nth-child(2) {
    color: #d4ad9f;
    span {
      font-size: 9px;
      margin-left: 10px;
    }
  }
  ${device.mobile} {
    display: block;
  }
`;

const Picture = styled.div`
  width: 165px;
  height: 165px;
  background-color: #c4c4c4;
  background: url(https://admin.newmarias.com/${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 0 auto;
  ${device.mobile} {
    width: 100px;
    height: 100px;
  }
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
  src,
  deleteOrderHandler,
  onDecreaseQuantity,
  onIncreaseQuantity,
}) => (
  <Tr>
    <Td>
      <Picture src={src} />
    </Td>
    <Td>{name}</Td>
    <Td>${price.toFixed(2)} MXN</Td>
    <Td>
      <MobileResume>
        <p>{name}</p>
        <p>
          ${price.toFixed(2) * quantity} <span>MXN</span>
        </p>
      </MobileResume>
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
  </Tr>
);

export default observer(OrderRow);
