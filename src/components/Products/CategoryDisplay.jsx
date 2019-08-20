import React, { Component } from 'react';
import styled from 'styled-components';

import Product from './Product';
import device from '../../utilities/device';
import backButtonImg from './assets/backButton.svg';
import forwardButtonImg from './assets/forwardButton.svg';
import CategoryList from '../CategoryList';
import Breadcrumbs from '../Breadcrumbs';
import banner from './assets/banner.jpg';
import AppLayout from '../AppLayout';
import CartCounter from '../CartCounter';
import WelcomePopup from '../WelcomePopup';

const Banner = styled.div`
  width: 100%;
  height: 13.5rem;
  background-color: #d6d8db;
  background-image: url('${banner}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;

  ${device.mobile} {
    height: 20vh;
  }
`;

const GridCell = styled('div')`
  position: relative;
  grid-area: ${({ area }) => area};
`;

const TabletGridCell = styled(GridCell)`
  ${device.mobile} {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
  }
`;

const Container = styled.div`
  position: relative;
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
    grid-template-areas:
      'breadcrumbs breadcrumbs breadcrumbs breadcrumbs cart'
      'content content content content content';
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
  opacity: 0.5;
  color: white;
  cursor: pointer;
  z-index: 999;
  display: none;
  ${device.mobile} {
    display: block;
  }
`;

const ProductList = styled.div`
  display: grid;
  grid-auto-rows: 12rem;
  grid-template-columns: repeat(4, minmax(12rem, 1fr));
  justify-content: space-between;
  grid-auto-flow: row dense;
  grid-gap: 1.5rem 1rem;
  padding-top: 0.5rem;
  flex: 3;

  ${device.laptop} {
    margin-left: 2rem;
    grid-template-columns: repeat(3, minmax(12rem, 1fr));
  }

  ${device.tablet} {
    grid-template-columns: repeat(2, minmax(12rem, 1fr));
  }

  ${device.mobile} {
    grid-template-columns: repeat(2, minmax(min-content, 1fr));
    padding: 20px 10%;
    margin-left: 0;
    grid-gap: 5vw;
  }
`;

class CategoryDisplay extends Component {
  state = {
    menuHidden: true,
  };

  menuToggle = () => {
    let newMenuHidden = this.state.menuHidden;
    newMenuHidden = !newMenuHidden;
    this.setState({ menuHidden: newMenuHidden });
  };

  render() {
    const { breadcrumbItems } = this.props;
    const products = this.props.products.sort((pA, pB) =>
      pA.title.localeCompare(pB.title)
    );

    return (
      <AppLayout>
        <WelcomePopup />
        <Banner />
        <Container>
          <TabletGridCell area="categories">
            <CategoryList hidden={this.state.menuHidden} />
          </TabletGridCell>
          <GridCell area="breadcrumbs">
            <Breadcrumbs links={breadcrumbItems} />
          </GridCell>
          <GridCell area="cart">
            <CartCounter width={69} height={61} />
          </GridCell>
          <GridCell area="content">
            <ProductList>
              {products.map(product => (
                <Product
                  key={product.title}
                  path={`/tienda/producto/${product.url}`}
                  thumbnail={product.thumbnail}
                  price={product.price}
                  name={product.title}
                  product={product}
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

export default CategoryDisplay;
