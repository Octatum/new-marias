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
import backButtonImg from './assets/backbutton.png';
import CartContext, { CartConsumer } from '../../components/CartContext';

const Layout = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 2rem 0;

  ${device.mobile} {
    display: block;
    padding: 83px 0;
  }
`;

const MobileHeader = styled.div`
  ::after {
    content: '';
    clear: both;
    display: table;
  }
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 24px;
  color: #626363;
  display: none;

  ${device.mobile} {
    display: block;
    width: 90%;
    margin: 25px auto;

    > button,
    > p {
      float: left;
    }

    > p {
      margin: 0;
      padding: 0;
    }

    > div {
      font-size: 11px;
      float: right;
    }

    > button {
      margin-right: 9px;
      margin-top: 3px;
    }
  }
`;

const BackButton = styled.button`
  display: block;
  width: 13px;
  height: 29px;
  :hover {
    cursor: pointer;
  }
  background-image: url(${backButtonImg});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: none;
`;

const BreadcrumbContainer = styled.div`
  box-sizing: border-box;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  padding-left: 0%;
  display: block;
  ${device.mobile} {
    > div {
      padding: 0;
      width: 50vw;
    }
    display: none;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 0 3.5rem;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  ${device.mobile} {
    width: 100%;
    display: inherit;
    padding: 0;
  }
`;

class ProductDetailContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImages: props.data.cockpitProduct.entry.gallery[0].value.images.map(
        i => i.path
      ),
      currentColor: props.data.cockpitProduct.entry.gallery[0].value.color, //props.data.productsJson.images[0].color,
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
      color: this.state.currentColor,
      thumbnail: this.state.currentImages[0],
      quantity: this.state.quantity,
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
            <BackButton />
            <p>{productName}</p>
            <CartCounter width={41} height={37} />
          </MobileHeader>
          <Container>
            <Gallery images={this.state.currentImages} />
            <CartConsumer>
              {({ addProduct }) => (
                <Detail
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
