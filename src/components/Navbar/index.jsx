import React from 'react';
import styled from 'styled-components';

import headerIcon from './assets/header-icon.svg';
import facebookIcon from './assets/fb-icon.svg';
import instagramIcon from './assets/ig-icon.svg';

const Container = styled.div`
  padding: 1.8em 1.5em;
  background: white;
  z-index: 5;
  text-align: center;
`;

const Logo = styled.img`
  height: 5.175em;
  padding-bottom: 1.887em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  width: 75%;

  li {
    padding-left: ${props => props.itemPadding};
    padding-right: 1.875em;
    color: #626363;
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 17.9px;
    text-transform: uppercase;
  }
`;

const Icon = styled.img`
  padding-right: 31px;
`;

function Navbar () {
  return (
    <Container>
      <Logo src={headerIcon}/>
      <List itemPadding='1.15em'>
        <li href='#top'>Inicio</li>
        <li href='#store'>Nuestra tienda</li>
        <li href='#about'>Quiénes somos</li>
        <li href='#stories'>Historias</li>
        <li href='#contact'>Contacto</li>
        <Icon src={facebookIcon}/>
        <Icon src={instagramIcon}/>
      </List>
    </Container>
  )
}

export default Navbar;
