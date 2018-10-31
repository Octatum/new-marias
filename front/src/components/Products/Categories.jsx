import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Product from './Product';
import CategoryState from './../../CategoryState';
import CounterStore from './../../ShoppingCart';
import device from './../../utilities/device';
import backButtonImg from './assets/backbutton.png';
import forwardButtonImg from './assets/forwardbutton.png';

const Container = styled.div`
  margin-top: -45px;
  padding-left: 58px;
  padding-right: 58px;
  display: flex;
  ${device.mobile} {
    padding-left: 0;
    padding-right: 0;
  }
  position: relative;
`;

const List = styled.ul`
  list-style: none;
  color: #626363;
  font-family: 'Archivo Narrow', sans-serif;
  flex: 1;
  li.title {
    font-size: 28px;
    padding-bottom: 6px;
  }
  li {
    font-size: 18px;
    padding-top: 9px;
  }
  li:hover {
    cursor: pointer;
  }

  button {
    display: none;
    width: 19px;
    height: 42px;
    border: none;
    :hover {
      cursor: pointer;
    }
  }
  transition: all 0.2s ease-in;
  ${device.mobile} {
    position: absolute;
    left: ${({ hide }) => (hide ? '-45%' : '0')};
    padding-left: 15px;
    li {
      width: 120px;
    }
  }
`;

const ButtonHide = styled.div`
  transition: all 0.2s ease-in;
  position: absolute;
  left: ${({ hide }) => (hide ? '15px' : '45%')};
  top: 175px;
  border: none;
  width: 19px;
  height: 42px;
  background: url(${({ hide }) => (hide ? forwardButtonImg : backButtonImg)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  color: white;
  :hover {
    cursor: pointer;
  }
  z-index: 999;
  display: none;
  ${device.mobile} {
    display: block;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(4, minmax(10em, 20vw));
  justify-content: space-between;
  grid-auto-flow: row dense;
  grid-gap: 1em;
  padding: 1em;
  flex: 3;
  ${device.mobile} {
    grid-template-columns: repeat(2, minmax(5em, 20vw));
    padding: 20px 20%;
    grid-gap: 2.5em;
  }
`;

const A = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const BackDrop = styled.div`
  ${device.mobile} {
    transition: all 0.2s ease-in;
    background-color: rgba(
      255,
      255,
      255,
      ${({ hide }) => (hide ? '0' : '0.95')}
    );
    width: 100%;
    height: 100%;
    position: absolute;
    left: ${({ hide }) => (hide ? '-100%' : '0')};
    top: 0;
  }
`;

class Categories extends Component {
  state = {
    categories: this.props.categories,
    products: this.props.products,
    menuHidden: false,
  };

  onSelectedProductHandler = id => {
    CounterStore.currentProduct = id;
  };

  menuToggle = () => {
    let newMenuHidden = this.state.menuHidden;
    newMenuHidden = !newMenuHidden;
    this.setState({ menuHidden: newMenuHidden });
  };

  render() {
    const categoryList = this.state.categories.map(c => (
      <li key={c.id}>
        <A
          href={`#${c.id}`}
          onClick={() => {
            CategoryState.setCurrent(c.id);
            this.menuToggle();
          }}
        >
          {c.name}
        </A>
      </li>
    ));

    const filteredProducts = this.state.products
      .filter(
        p => p.category === CategoryState.current || CategoryState.current === 1
      )
      .map(function(p) {
        return (
          <Product
            clicked={this.onSelectedProductHandler.bind(this, p.id)}
            key={p.id}
            name={p.name}
            price={p.price}
            path={p.path}
            thumbnail={p.thumbnail}
          />
        );
      }, this);

    return (
      <Container>
        <BackDrop hide={this.state.menuHidden} />
        <List hide={this.state.menuHidden}>
          <li className="title">Categorías</li>
          {categoryList}
        </List>
        <Grid>{filteredProducts}</Grid>
        <ButtonHide onClick={this.menuToggle} hide={this.state.menuHidden} />
      </Container>
    );
  }
}

export default observer(Categories);
