import React, { Component }from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import headerIcon from './assets/header-icon.svg';
import facebookIcon from './assets/fb-icon.svg';
import instagramIcon from './assets/ig-icon.svg';
import CategoryState from './../../CategoryState';
import { TODAS } from './../../constants/categories';
import device from './../../utilities/device';
import BurgerButton from './BurgerButton';

const Container = styled.div`
  padding: 1.8em 1.5em;
  background: white;
  z-index: 5;
  text-align: center;
  position: fixed;
  top: 0;
  width: 100%;
  ${device.mobile}{
    padding: 0;
  }
`;

const Logo = styled.img`
  height: 5.175em;
  padding-bottom: 1.887em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  ${device.mobile}{
    width: 75%;
    padding: 0;
    margin: 0 0 0 16px;
  }
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
    font-size: 18px;
    text-transform: uppercase;
  }

  li a {
    text-decoration: none;
    color: #626363;
  }

  ${device.mobile}{
    flex-direction: column;
    text-align: right;
    width: 200px;
    background-color: #ffffff;
    position: absolute;
    right: 0;
    border: none;
    li {
      margin-bottom: 23px;
      padding: 0 17px;
    }
    display: ${({ hide }) => (hide ? 'none' : 'block')};
  }
`;

const Icon = styled.img`
  padding: 0 31px 10px 0;
  ${device.mobile}{
    padding: 0;
  }
`;

class Navbar extends Component {

  state = {
    visible: true
  };

  toggleNavbar = () => {
    let newVisible = this.state.visible;
    newVisible = !newVisible;
    this.setState({
      visible: newVisible
    });
  };

  backToStoreHandler = () => CategoryState.setCurrent(TODAS);

  render() {
    return (
      <Container>
        <Logo src={headerIcon}/>
        <BurgerButton onClick={this.toggleNavbar}/>
        <List hide={this.state.visible}>
          <li><a href="#top">Inicio</a></li>
          <li href="#store">
            <Link onClick={this.backToStoreHandler} to="/">
              {' '}
              Nuestra tienda{' '}
            </Link>
          </li>
          <li><a href="#about">Quiénes somos</a></li>
          <li><a href="#stories">Historias</a></li>
          <li><a href="#contact">Contacto</a></li>
          <li><Icon src={facebookIcon} /></li>
          <li><Icon src={instagramIcon} /></li>
        </List>
      </Container>
    );
  }
}
export default Navbar;
