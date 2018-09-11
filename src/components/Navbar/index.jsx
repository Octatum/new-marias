import React, { Component } from 'react';
import styled from 'styled-components';

import headerIcon from './assets/header-icon.svg';

const Container = styled.div`
  padding: 1.8em 1.5em;
  background: white;
  z-index: 5;
  margin: 0 auto;
`;

const Logo = styled.img`
  height: 5.175em;
  padding-bottom: 1.887em;
`;

const List = styled.ul`
  display: flex;
  list-style: none;

  li {
    padding-right: ${props => props.itemPadding};
    color: #626363;
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 17.9px;
  }
`;

function Navbar () {
  return (
    <Container>
      <Logo src={headerIcon}/>
      <List itemPadding='1.3em'>
        <li href='#top'>Inicio</li>
        <li href='#store'>Nuestra tienda</li>
        <li href='#about'>Quiénes somos</li>
        <li href='#stories'>Historias</li>
        <li href='#contact'>Contacto</li>
      </List>
    </Container>
  )
}

export default Navbar;
