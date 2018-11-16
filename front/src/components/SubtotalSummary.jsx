import React from 'react';
import styled from 'styled-components';
import device from '../utilities/device';

const Summary = styled.div`
  font-family: 'Archivo Narrow', sans-serif;
  text-align: right;
  font-size: 18px;
  color: #626363;
  margin-bottom: 30px;
  p {
    margin: 5px 0;
  }
  ${device.mobile} {
    margin-right: 33px;
    p:nth-child(1) {
      font-size: 16px;
    }
  }
`;

const SubtotalSummary = props => {
  const { products } = props;

  return (
    <Summary>
      <p>SUBTOTAL</p>
      <p>${(0.0).toFixed(2)} MXN</p>
    </Summary>
  );
};

export default SubtotalSummary;
