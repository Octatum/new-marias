import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const ProductImage = styled.div`
  width: 65px;
  height: 65px;
  background: #c4c4c4;
  background: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const ProductView = styled.div`
  display: flex;
  flex-direction: row;
  h1 {
    margin-left: 15px;
  }
`;

const SummaryRow = props => (
  <Container>
    <ProductView>
      <ProductImage src={props.src} />
      <h1>({props.quantity})</h1>
      <h1>{props.name}</h1>
    </ProductView>
    <h1>${parseInt(props.price).toFixed(2)}</h1>
  </Container>
);
export default SummaryRow;
