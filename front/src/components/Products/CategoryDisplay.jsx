import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import Product from './Product';
import CounterStore from '../../ShoppingCart';
import device from '../../utilities/device';
import backButtonImg from './assets/backbutton.png';
import forwardButtonImg from './assets/forwardbutton.png';
import CategoryList from '../CategoryList';
import shoppingCart from '../../ShoppingCart';
import Breadcrumbs from '../Breadcrumbs';
import banner from './assets/banner.jpg';
import AppLayout from '../AppLayout';
import CartCounter from '../CartCounter';

const Banner = styled.div`
  width: 100%;
  height: 217px;
  background-color: #d6d8db;
  background-image: url('${banner}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  ${device.mobile} {
    margin-top: 103px;
    height: 90px;
  }
`;

const GridCell = styled('div')`
  grid-area: ${({ area }) => area};
`;

const Container = styled.div`
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  padding-bottom: 3rem;
  margin-top: 0.5rem;
  display: grid;
  width: 100%;
  box-sizing: border-box;
  grid-template: 2rem min-content / 1fr 4fr 1fr 0.5fr;
  grid-row-gap: 1rem;
  grid-template-areas:
    'breadcrumbs breadcrumbs breadcrumbs breadcrumbs cart'
    'categories content content content cart';
  ${device.mobile} {
    padding-left: 0;
    padding-right: 0;
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

const ProductList = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(4, minmax(10em, 20vw));
  justify-content: space-between;
  grid-auto-flow: row dense;
  grid-gap: 1em;
  padding-top: 0.5rem;
  flex: 3;
  ${device.mobile} {
    grid-template-columns: repeat(2, minmax(5em, 20vw));
    padding: 20px 20%;
    grid-gap: 2.5em;
  }
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

class CategoryDisplay extends Component {
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
    const { products, breadcrumbItems } = this.props;

    return (
      <AppLayout>
        <Banner />
        <Container>
          <GridCell area="categories">
            <CategoryList hidden={this.state.menuHidden} />
          </GridCell>
          <GridCell area="breadcrumbs">
            <Breadcrumbs links={breadcrumbItems} />
          </GridCell>
          <GridCell area="cart">
            <CartCounter
              width={69}
              height={61}
              quantity={shoppingCart.counter}
            />
          </GridCell>
          <BackDrop hide={this.state.menuHidden} />
          <GridCell area="content">
            <ProductList>
              {products.map(product => (
                <Product
                  path={`/tienda/producto-${product.id}`}
                  thumbnail={product.entry.thumbnail}
                  price={product.price}
                  name={product.name}
                />
              ))}
            </ProductList>
          </GridCell>
          <ButtonHide onClick={this.menuToggle} hide={this.state.menuHidden} />
        </Container>
      </AppLayout>
    );
  }
}

export default observer(CategoryDisplay);
