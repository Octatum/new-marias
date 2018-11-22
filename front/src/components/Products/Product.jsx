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

const Placeholder = styled.div`
  width: 145px;
  height: 145px;
  background-color: #d6d8db;
  background-image: url('https://admin.newmarias.com${({ src }) => src}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 5px;
  grid-column: span 1;
  max-width: none;
  ${device.mobile} {
    width: 100%;
    padding: 0;
    margin: 0;
  }
  display: inline-block;
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
        <Placeholder src={props.thumbnail.path} />
      </CoolLink>
      <TextBlock>{props.name}</TextBlock>
      <TextBlock>${parseFloat(props.price).toFixed(2)}</TextBlock>
    </Container>
  );
}

export default Product;
