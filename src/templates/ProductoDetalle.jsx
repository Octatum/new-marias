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
import { products } from './../constants/productsInfo';
import Breadcrumb from './../components/Breadcrumb';
import BreadcrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import device from './../utilities/device';
import CartCounter from './../components/Detail/CartCounter';
import './../components/setup.css';

const AppLayout = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  ${device.mobile} {
    display:block;
    padding:0;
  }
`;

const MobileHeader = styled.div`
  ::after {
    content: "";
    clear: both;
    display: table;
  }
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 24px;
  color: #626363;
  display: none;

  ${device.mobile}{
    display: block;
    width: 90%;
    margin: 25px auto;

    > button, > p {
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
`

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
  margin: 0 auto;
  width: 1240px;
  ${device.mobile} {
    display:none;
  }
`;

const Container = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  padding: 20px 24px;
  width: 1240px;
  
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
      currentImages: props.data.productsJson.imagesBlue,
      currentColor: 'Blue',
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
      console.log('Current ' + this.state.currentImages);
      if (this.state.currentColor === 'Red') {
        this.setState({
          currentImages: this.props.data.productsJson.imagesRed,
        });
      } else if (this.state.currentColor === 'Yellow') {
        this.setState({
          currentImages: this.props.data.productsJson.imagesYellow,
        });
      } else {
        this.setState({
          currentImages: this.props.data.productsJson.imagesBlue,
        });
      }
    });

    this.setState({
      currentColor: e.target.value,
    });

    if (this.state.currentColor === 'Red') {
      this.setState({
        currentImages: this.props.data.productsJson.imagesBlue,
      });
    }

    this.setState({ boardAddModalShow: true }, () => {
      console.log('AFTER STATE ' + this.state.currentColor);
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
          <BackButton/>
          <p>{this.props.data.productsJson.name}</p>
          <CartCounter
            quantity={Cart.counter}
            width={41}
            height={37}/>
        </MobileHeader>
        <Container>
          <Gallery
            category={categories.find(c => c.id === CategoryState.current).name}
            images={this.state.currentImages}
            color={this.state.currentColor}
          />
          <Detail
            name={this.props.data.productsJson.name}
            price={parseFloat(this.props.data.productsJson.price)}
            description={this.props.data.productsJson.description}
            onChange={this.handleChangeColor}
            addingOrderHandler={this.addOrder}
            onChangeQuantity={this.changeQuantityHandler}
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
      name,
      price,
      description,
      id,
      imagesBlue,
      imagesRed,
      imagesYellow
    }
  }
`