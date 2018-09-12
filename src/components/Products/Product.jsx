import React, { Component } from 'react';
import styled from 'styled-components';

import Grid from 'react-css-grid';

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
