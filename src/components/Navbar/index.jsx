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
  }
`;

const Anchor = styled.a`
  text-decoration: none;
  text-transform: uppercase;
  color: #626363;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 17.9px;
`;

function Navbar () {
  return (
    <Container>
      <Logo src={headerIcon}/>
      <List itemPadding='1.3em'>
        <li><Anchor href='#top'>Inicio</Anchor></li>
        <li><Anchor href='#store'>Nuestra tienda</Anchor></li>
        <li><Anchor href='#about'>Quiénes somos</Anchor></li>
        <li><Anchor href='#stories'>Historias</Anchor></li>
        <li><Anchor href='#contact'>Contacto</Anchor></li>
      </List>
    </Container>
  )
}

export default Navbar;
