import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import device from './../../utilities/device';
import Text from '../Text';
import { formatPrice } from '../../utilities/lib';

const Container = styled.div`
  justify-self: center;
  ${device.tablet} {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
    box-sizing: border-box;
    padding: 0 5%;
  }
`;

const ProductImage = styled(GatsbyImage)`
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
  max-width: 7em;
`;

const CoolLink = styled(Link)`
  width: 100%;
`;

function Product(props) {
  const {
    priceRange: {
      minVariantPrice: { amount: minPrice },
      maxVariantPrice: { amount: maxPrice },
    },
  } = props.product;
  const hasPriceRange = minPrice !== maxPrice;

  const minDisplayPrice = formatPrice(minPrice);
  const maxDisplayPrice = formatPrice(maxPrice);

  return (
    <Container>
      <CoolLink to={props.path}>
        <ProductImage fixed={props.thumbnail} />
      </CoolLink>
      <TextBlock size={1.2}>{props.name}</TextBlock>
      <TextBlock style={{ opacity: '0.6' }}>
        {minDisplayPrice} {hasPriceRange && `- ${maxDisplayPrice}`}
      </TextBlock>
    </Container>
  );
}

export default Product;
