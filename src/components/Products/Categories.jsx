import React, { Component } from 'react';
import styled from 'styled-components';
import Product from './Product';

import Grid from 'react-css-grid';

const Container = styled.div`
  padding-top: 12.2px;
  padding-left: 58px;
`;

const List = styled.ul`
  list-style: none;
  color: #626363;
  font-family: 'Archivo Narrow', sans-serif;

  li.title {
    font-size: 28px;
    padding-top: 12.2px;
    padding-bottom: 6px;
  }

  li {
    font-size: 18px;
    padding-top: 9px;
  }
`;

function Categories () {
  return (
    <Container>
      <Grid
        width={100}
        gap={16}>
        <List>
          <li class="title">Categorías</li>
          <li href='#alebrijes'>Alebrijes</li>
          <li href='#bolsas'>Bolsas</li>
          <li href='#cajas'>Cajas Multiusos</li>
          <li href='#cruces'>Cruces</li>
          <li href='#decoracion'>Decoración</li>
          <li href='#molcajetes'>Molcajetes</li>
          <li href='#muñecas'>Muñecas Marías</li>
          <li href='#papel'>Papel Picado</li>
          <li href='#piñatas'>Piñatas</li>
          <li href='#tequileros'>Tequileros</li>
          <li href='#tortilleros'>Tortilleros</li>
          <li href='#virgenes'>Virgenes</li>
        </List>
        <Product />
        <Product />
        <Product />
        <Product />
      </Grid>
    </Container>
  )
}

export default Categories;
