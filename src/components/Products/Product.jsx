import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const Container = styled.div`
  padding-top: 12.2px;

  p {
    color: #626363;
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 14px;
  }
`;

const Placeholder = styled.div`
  width: 145px;
  height: 145px;
  background-color: #d6d8db;
  background-image: url(https://ae01.alicdn.com/kf/HTB1ROweKpXXXXbYXpXXq6xXFXXXp/D-a-de-la-cosecha-artesan-as-rojo-chino-artesan-a-linterna-con-vidrio-roto.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-bottom: 5px;
  grid-column: span 1;
  max-width: none;
`;

function Product (props) {
  return (
    <Container>
      <Link to="/producto/"><Placeholder /></Link>
      <p>{props.name}</p>
      <p>${props.price.toFixed(2)}</p>
    </Container>
  )
}

export default Product;
