import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import device from './../../utilities/device';

const Container = styled.div`
  p {
    color: #626363;
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 14px;
  }
  ${device.mobile} {
    p {
      font-size: 13px;
    }
  }
`;

const Placeholder = styled.div`
  width: 145px;
  height: 145px;
  background-color: #d6d8db;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 5px;
  grid-column: span 1;
  max-width: none;
  ${device.mobile} {
    width: 110px;
    height: 110px;
    padding: 0;
    margin: 0;
  }
  display: inline-block;
`;

function Product(props) {
  return (
    <Container>
      <Link to={props.path}>
        <Placeholder 
          onClick={props.clicked}
          src={props.thumbnail}/>
      </Link>
      <p>{props.name}</p>
      <p>${parseFloat(props.price).toFixed(2)}</p>
    </Container>
  );
}

export default Product;
