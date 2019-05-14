import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 5%;
  box-sizing: border-box;
  margin: 0.75em 0;
`;

const ProductImage = styled.div`
  width: 4rem;
  height: 4rem;
  background: #c4c4c4;
  background: url(${({ src }) => src});
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`;

const ProductView = styled.div`
  display: flex;
  align-items: center;

  h1 {
    margin-left: 15px;
  }
`;

const SummaryRow = props => {
  const { product } = props;

  return (
    <Container>
      <ProductView>
        <ProductImage src={product.thumbnail} />
        <h1>({product.amount})</h1>
        <h1>{product.name}</h1>
      </ProductView>
      <h1>${parseInt(product.price * product.amount).toFixed(2)}</h1>
    </Container>
  );
};
export default SummaryRow;
