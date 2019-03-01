import React from 'react';
import styled from 'styled-components/macro';
import Helmet from 'react-helmet';

import toTitleCase from '../../utilities/toTitleCase';
import Detail from '../../components/Detail';
import AppLayout from '../../components/AppLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import CartCounter from '../../components/CartCounter';
import device from '../../utilities/device';
import Gallery from '../../components/Gallery';
import backButtonImg from './assets/backButton.svg';
import CartContext, { CartConsumer } from '../../components/CartContext';
import GatsbyLink from 'gatsby-link';

const Layout = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  flex-direction: column;
  padding: 2rem 3rem;

  ${device.tablet} {
    padding: 2rem 1rem;
  }
`;

const MobileHeader = styled.div`
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 20px;
  color: #626363;
  display: none;

  ${device.tablet} {
    display: flex;
    align-items: center;
  }
`;

const Par = styled('p')`
  flex: 1;
  padding-left: 1rem;
`;

const BackButton = styled(GatsbyLink)`
  display: block;
  width: 13px;
  height: 29px;
  cursor: pointer;
  background-image: url(${backButtonImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
`;

const BreadcrumbContainer = styled.div`
  margin-bottom: 2rem;

  ${device.tablet} {
    display: none;
  }
`;

const Container = styled.div`
  display: flex;

  ${device.tablet} {
    flex-direction: column;
  }
`;

const StyledGallery = styled(Gallery)`
  flex: 4;
  padding-right: 2rem;
  box-sizing: border-box;

  ${device.tablet} {
    padding: 0;
  }
`;

const StyledDetail = styled(Detail)`
  flex: 2;
`;

class ProductDetailContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImages: props.data.cockpitProduct.entry.gallery[0].value.images.map(
        i => i.path
      ),
      currentColor: props.data.cockpitProduct.entry.gallery[0].value.color,
      quantity: 1,
    };
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  addProduct = cbAddProduct => {
    const { cockpitProduct } = this.props.data;

    cbAddProduct({
      id: cockpitProduct.id,
      name: cockpitProduct.entry.name,
      price: cockpitProduct.entry.price,
      type: this.state.currentColor,
      thumbnail: this.state.currentImages[0],
      amount: this.state.quantity,
    });
  };

  changeQuantityHandler = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  handleChangeColor(e) {
    this.setState({ boardAddModalShow: true }, () => {
      const color = this.state.currentColor;
      this.setState({
        currentImages: this.props.data.cockpitProduct.entry.gallery
          .find(g => g.value.color === color)
          .value.images.map(i => i.path),
      });
    });

    this.setState({
      currentColor: e.target.value,
    });
  }

  render() {
    const { cockpitProduct } = this.props.data;

    const categoryName = cockpitProduct.entry.category_id.display;
    const cleanCategoryName = categoryName.replace(/\W/g, '');
    const productName = cockpitProduct.entry.name.toLowerCase();

    const breadcrumbItems = [
      {
        to: '/tienda',
        name: 'Todo',
      },
      {
        to: `/tienda/categoria/${cleanCategoryName}`,
        name: categoryName.toLowerCase(),
      },
      {
        name: productName,
      },
    ];

    return (
      <AppLayout>
        <Layout>
          <Helmet title={toTitleCase(productName)} />
          <BreadcrumbContainer>
            <Breadcrumbs links={breadcrumbItems} />
          </BreadcrumbContainer>
          <MobileHeader>
            <BackButton to="tienda" />
            <Par>{productName}</Par>
            <CartCounter width={50} height={40} />
          </MobileHeader>
          <Container>
            <StyledGallery images={this.state.currentImages} />
            <CartConsumer>
              {({ addProduct }) => (
                <StyledDetail
                  product={cockpitProduct}
                  onColorChange={this.handleChangeColor}
                  onQuantityChange={this.changeQuantityHandler}
                  addToCartHandler={() => this.addProduct(addProduct)}
                />
              )}
            </CartConsumer>
          </Container>
        </Layout>
      </AppLayout>
    );
  }
}

ProductDetailContainer.contextType = CartContext;

export default ProductDetailContainer;
