import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import headerIcon from './assets/header-icon.svg';
import facebookIcon from './assets/fb-icon.svg';
import instagramIcon from './assets/ig-icon.svg';
import CategoryState from './../../CategoryState';
import {TODAS} from "./../../constants/categories";

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
  padding-top: 0.7em;
  border-top: 2px solid #d6d8db;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
  width: 60%;

  li {
    padding-left: 1.15em;
    padding-right: 1.875em;
    color: #626363;
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 17.9px;
    text-transform: uppercase;
  }

  li a {
    text-decoration: none;
    color: #626363;
  }

`;

const Icon = styled.img`
  padding: 0 31px 10px 0;
`;

const backToStoreHandler = () => CategoryState.setCurrent(TODAS);

function Navbar () {
  return (
    <Container>
      <Logo src={headerIcon}/>
      <List>
        <li href='#top'>Inicio</li>
        <li href='#store'><Link onClick={backToStoreHandler} to="/"> Nuestra tienda </Link></li>
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
