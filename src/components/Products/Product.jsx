import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import device from './../../utilities/device';
import Text from '../Text';

const Container = styled.div`
  ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 5%;
  }
`;

const ProductImage = styled('img')`
  width: 145px;
  height: 145px;
  margin-bottom: 5px;
  grid-column: span 1;
  max-width: none;
  ${device.mobile} {
    width: 100%;
    height: auto;
    padding: 0;
    margin: 0;
  }
`;

const TextBlock = styled(Text)`
  width: 100%;
`;

const CoolLink = styled(Link)`
  width: 100%;
`;

function Product(props) {
  return (
    <Container>
      <CoolLink to={props.path}>
        <ProductImage
          src={`https://admin.newmarias.com${props.thumbnail.path}`}
        />
      </CoolLink>
      <TextBlock>{props.name}</TextBlock>
      <TextBlock>${parseFloat(props.price).toFixed(2)}</TextBlock>
    </Container>
  );
}

export default Product;
