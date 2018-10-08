import React from 'react';
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

  ${device.mobile}{
    position: absolute;
    left: 0;
    background-color: rgba(255,255,255, 0.95);
    width: 100%;
    padding-left: 15px;
    li {
      width: 120px;
    }
    display:none;
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

const onSelectedProductHandler = id => {
  CounterStore.currentProduct = id;
};

const Categories = ({ categories, products }) => {
  const categoryList = categories.map(c => (
    <li
      key={c.id}>
      <A
        href={`#${c.id}`}
        onClick={() => CategoryState.setCurrent(c.id)}>
        {c.name}
      </A>
    </li>
  ));

  const filteredProducts = products
    .filter(
      p =>
        p.category === CategoryState.current ||
        CategoryState.current === 'todas'
    )
    .map(function(p) {
      return (
        <Product
          clicked={() => onSelectedProductHandler(p.id)}
          key={p.id}
          name={p.name}
          price={p.price}
          path={p.path}
        />
      );
    });

  return (
    <Container>
      <List>
        <li className="title">
          Categorías
        </li>
        {categoryList}
      </List>
      <Grid>{filteredProducts}</Grid>
    </Container>
  );
};

export default observer(Categories);
