import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import headerIcon from './assets/header-icon.svg';
import facebookIcon from './assets/fb-icon.svg';
import instagramIcon from './assets/ig-icon.svg';
import device from './../../utilities/device';
import BurgerButton from './BurgerButton';
import GatsbyLink from 'gatsby-link';

export const navbarIds = {
  inicio: 'inicio',
  quienesSomos: 'quienesSomos',
  contacto: 'contacto',
};

const Container = styled.div`
  position: -webkit-sticky;
  position: sticky;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1.2em 1.5em 0.4em 1.5em;
  background: white;
  z-index: 1000;
  text-align: center;
  top: 0;
  width: 100%;
  border-bottom: 2px solid #000000;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0px 0px 11px -2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 11px -2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 11px -2px rgba(0, 0, 0, 0.75);

  ${device.mobile} {
    padding-top: 0.4em;
    padding-bottom: 1em;
  }
`;

const Logo = styled.img`
  height: 4em;
  padding-bottom: 1em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  ${device.mobile} {
    width: 75%;
    padding: 0;
    margin-left: 1rem;
  }
`;

const List = styled.ul`
  display: flex;
  padding-top: 0.7em;
  border-top: 2px solid #d6d8db;
  list-style: none;
  margin: 0 auto;
  justify-content: center;
  width: 60%;

  li {
    padding: 0 1.2em;
    color: ${({ theme }) => theme.colors.darkgray};
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 18px;
    text-transform: uppercase;
  }

  li a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.darkgray};
  }

  ${device.tablet} {
    li {
      font-size: 14px;
    }
  }

  ${device.mobile} {
    flex-direction: column;
    text-align: right;
    width: 200px;
    background-color: #ffffff;
    position: absolute;
    right: 0;
    border: none;
    top: 5.4rem;
    li {
      margin-bottom: 23px;
      padding: 0 17px;
    }
    display: ${({ visible }) => (visible ? 'block' : 'none')};
  }
`;

const Icon = styled.img`
  ${device.mobile} {
    padding: 0;
  }
`;

const Overlay = styled('div')`
  width: 100vw;
  height: 100vh;
  display: ${({ display }) => display};
  position: fixed;
  top: 0;
  left: 0;
`;

class Navbar extends Component {
  state = {
    visible: false,
  };

  toggleNavbar = () => {
    let newVisible = this.state.visible;
    newVisible = !newVisible;
    this.setState({
      visible: newVisible,
    });
  };

  closeNavbar = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <Container>
        <Logo src={headerIcon} />
        <BurgerButton onClick={this.toggleNavbar} />
        <Overlay
          display={this.state.visible ? 'initial' : 'none'}
          onClick={this.closeNavbar}
        />
        <List visible={this.state.visible}>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link onClick={this.backToStoreHandler} to="/tienda">
              {' '}
              Nuestra tienda{' '}
            </Link>
          </li>
          <li>
            <GatsbyLink to={`/#${navbarIds.quienesSomos}`}>
              Quiénes somos
            </GatsbyLink>
          </li>
          <li>
            <GatsbyLink to={`/#${navbarIds.contacto}`}>Contacto</GatsbyLink>
          </li>
          <li>
            <a
              href="https://www.facebook.com/newmarias/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon src={facebookIcon} />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/new_marias/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon src={instagramIcon} />
            </a>
          </li>
        </List>
      </Container>
    );
  }
}
export default Navbar;
