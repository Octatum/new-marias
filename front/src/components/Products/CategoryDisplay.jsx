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
import CartCounter from '../Detail/CartCounter';
import Breadcrumbs from '../Breadcrumbs';
import banner from './assets/banner.jpg';
import AppLayout from '../AppLayout';

const BreadcrumbContainer = styled.div`
  padding-top: 12.2px;
  border-bottom: 1px solid #626363;
  box-sizing: border-box;
  width: 85%;
  margin: 0 auto;
  margin-left: 58px;
  margin-bottom: 15px;
  > div {
    padding: 0;
  }
  ${device.mobile} {
    width: 100%;
    padding-left: 0;
    margin-left: 0;
    > div {
      padding: 0;
      margin: 0;
    }
  }
`;

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

const CartContainer = styled.div`
  font-family: 'Archivo Narrow', sans-serif;
  padding-right: 20px;
  > * {
    float: right;
    position: relative;
    top: -10px;
  }
  > :nth-child(1) {
    display: block;
  }
  > :nth-child(2) {
    display: none;
  }
  ${device.mobile} {
    div {
      top: -20px;
    }
    > :nth-child(1) {
      display: none;
    }
    > :nth-child(2) {
      display: block;
    }
  }
`;

const Container = styled.div`
  padding-left: 3.5rem;
  padding-right: 3.5rem;
  padding-bottom: 3rem;
  display: flex;
  ${device.mobile} {
    padding-left: 0;
    padding-right: 0;
  }
  position: relative;
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
  padding: 1em;
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
        <BreadcrumbContainer>
          <Breadcrumbs links={breadcrumbItems} />
        </BreadcrumbContainer>
        <CartContainer>
          <CartCounter width={69} height={61} quantity={shoppingCart.counter} />
          <CartCounter width={36} height={32} quantity={shoppingCart.counter} />
        </CartContainer>

        <Container>
          <BackDrop hide={this.state.menuHidden} />
          <CategoryList hidden={this.state.menuHidden} />
          <ProductList>
            {products.map(product => (
              <Product
                path={`/producto-${product.id}`}
                thumbnail={product.entry.thumbnail}
                price={product.price}
                name={product.name}
              />
            ))}
          </ProductList>
          <ButtonHide onClick={this.menuToggle} hide={this.state.menuHidden} />
        </Container>
      </AppLayout>
    );
  }
}

export default observer(CategoryDisplay);
