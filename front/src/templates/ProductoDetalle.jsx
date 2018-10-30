import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Navbar from '../components/Navbar';
import Gallery from '../components/Gallery';
import backButtonImg from './../components/Gallery/assets/backbutton.png';
import Detail from '../components/Detail';
import CategoryState from './../CategoryState';
import Cart from './../ShoppingCart';
import { categories } from './../constants/categories.js';
import Breadcrumb from './../components/Breadcrumb';
import BreadcrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import device from './../utilities/device';
import CartCounter from './../components/Detail/CartCounter';
import './../components/setup.css';

const AppLayout = styled.div`
  padding-top: 170px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
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
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 85%;

  ${device.mobile} {
    width: 100%;
    display: inherit;
    padding: 0;
  }
`;

class Producto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImages: props.data.productsJson.images[0].src,
      currentColor: props.data.productsJson.images[0].color,
      quantity: 1,
    };
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState({
      quantity: 1,
    });
  }

  addOrder = () => {
    Cart.addOrder(this.props.data.productsJson.id, this.state.quantity);
  };

  changeQuantityHandler = e => {
    this.setState({ quantity: parseInt(e.target.value) });
  };

  handleChangeColor(e) {

    this.setState({ boardAddModalShow: true }, () => {
      const color = this.state.currentColor;
      this.setState({
        currentImages: this.props.data.productsJson.images.find(i => i.color === color).src,
      });

    });

    this.setState({
      currentColor: e.target.value,
    });
  }

  render() {
    return (
      <AppLayout>
        <Navbar />
        <BreadcrumbContainer>
          <Breadcrumb>
            <BreadcrumbItem>
              {categories.find(c => c.id === CategoryState.current).name}
            </BreadcrumbItem>
          </Breadcrumb>
        </BreadcrumbContainer>
        <MobileHeader>
          <BackButton />
          <p>{this.props.data.productsJson.name}</p>
          <CartCounter quantity={Cart.counter} width={41} height={37} />
        </MobileHeader>
        <Container>
          <Gallery
            category={categories.find(c => c.id === CategoryState.current).name}
            images={this.state.currentImages}
          />
          <Detail
            name={this.props.data.productsJson.name}
            price={parseFloat(this.props.data.productsJson.price)}
            description={this.props.data.productsJson.description}
            onChange={this.handleChangeColor}
            addingOrderHandler={this.addOrder}
            onChangeQuantity={this.changeQuantityHandler}
            colors={this.props.data.productsJson.images.map(i => i.color)}
          />
        </Container>
      </AppLayout>
    );
  }
}

export default observer(Producto);

export const query = graphql`
  query($slug: String!) {
    productsJson(fields: { slug: { eq: $slug } }) {
      name
      price
      description
      id
      images {
        color
        src
      }
    }
  }
`;
