import React, { Component } from 'react';
import styled from 'styled-components';

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
  margin-bottom: 5px;
  grid-column: span 1;
  max-width: none;
`;

function Product () {
  return (
    <Container>
      <Placeholder />
      <p>Jarrón de porcelana china</p>
      <p>$800.00</p>
    </Container>
  )
}

export default Product;
