import React from 'react';
import styled from 'styled-components';
import device from './../../../utilities/device';

const Container = styled.div`
  padding: 0;
  width: 83px;
  color: #ffffff;
  height: 33px;
  line-height: 33px;
  margin: 0 auto;
  ${device.mobile} {
    margin: inherit;
  }
`;

const Quantity = styled.div`
  width: 50%;
  height: 100%;
  background-color: #d4ad9f;
  margin: 0 3px;
  float: left;
`;

const Button = styled.button`
  float: left;
  font-weight: bold;
  color: #ffffff;
  width: 20%;
  height: 100%;
  background-color: #d4ad9f;
  border: none;
  :hover {
    cursor: pointer;
  }
`;

const QuantityControls = props => (
  <Container>
    <Button onClick={props.onDecreaseQuantity}>-</Button>
    <Quantity>{props.quantity}</Quantity>
    <Button onClick={props.onIncreaseQuantity}>+</Button>
  </Container>
);
export default QuantityControls;
