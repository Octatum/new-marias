import React, { Component }from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Product from './Product';
import CategoryState from './../../CategoryState';
import CounterStore from './../../ShoppingCart';
import device from './../../utilities/device';

const Container = styled.div`
  margin-top: -45px;
  padding-left: 58px;
  padding-right: 58px;
  display: flex;
  ${device.mobile}{
    padding-left: 0;
    padding-right: 0;
  }
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

  ${device.mobile}{
    position: absolute;
    left: 0;
    left: ${({ hide }) => (hide ? '-35%' : '0')};
    background-color: ${({ hide }) => (hide ? 'transparent' : 'rgba(255, 255, 255, 0.95)')};
    width: 100%;
    padding-left: 15px;
    li {
      width: 120px;
    }
    button {
      display: block;
      position: absolute;
      left: calc(45% - 20px);
      top: calc(50% - 20px);
    }
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
  ${device.mobile}{
    grid-template-columns: repeat(2, minmax(5em, 20vw));
    padding: 20px 20%;
    grid-gap: 2.5em;
  }
`;

const A = styled.a`
  text-decoration: none;
  color: inherit;
  display: block;
`

//const Categories = ({ categories, products }) => {
class Categories extends Component {
  state  = {
    categories: this.props.categories,
    products: this.props.products,
    menuHidden: false
  }

  onSelectedProductHandler = id => {
    CounterStore.currentProduct = id;
  };

  menuToggle = () => {
    let newMenuHidden = this.state.menuHidden;
    newMenuHidden = !newMenuHidden;
    this.setState({menuHidden: newMenuHidden});
  }

  render(){
    const categoryList = this.state.categories.map(c => (
      <li
        key={c.id}>
        <A
          href={`#${c.id}`}
          onClick={() => {CategoryState.setCurrent(c.id); this.menuToggle();}}>
          {c.name}
        </A>
      </li>
    ));

    const filteredProducts = this.state.products
      .filter(
        p =>
          p.category === CategoryState.current ||
          CategoryState.current === 'todas'
      )
      .map(function(p) {
        return (
          <Product
            clicked={() => this.onSelectedProductHandler(p.id)}
            key={p.id}
            name={p.name}
            price={p.price}
            path={p.path}
          />
        );
      });

    return (
      <Container>
        <List hide={this.state.menuHidden}>
          <li className="title">
            Categorías
          </li>
          {categoryList}
          <button onClick={this.menuToggle}></button>
        </List>
        <Grid>{filteredProducts}</Grid>
      </Container>
    );
  }
};

export default observer(Categories);
