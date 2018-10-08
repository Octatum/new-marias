import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { observer } from 'mobx-react';
import { StaticQuery, graphql } from 'gatsby';
import Navbar from '../components/Navbar';
import shoppingCartImg from '../components/Detail/assets/shoppingcart.svg';
import shoppingCart from './../ShoppingCart';
import Categories from '../components/Products/Categories';
import CategoryState from './../CategoryState';
import { categories } from './../constants/categories.js';
import './../components/setup.css';
import device from './../utilities/device';
import BreadCrumb from './../components/Breadcrumb';
import BreadCrumbItem from './../components/Breadcrumb/BreadcrumbItem';
import CartCounter from './../components/Detail/CartCounter';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  width: 100%;
  height: 217px;
  background-color: #d6d8db;
  background-image: url(http://placekitten.com/g/1200/217);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin-top: 220px;
  ${device.mobile} {
    margin-top: 103px;
    height: 90px;
  }
`;

const Container = styled.div`
  padding-top: 12.2px;
  border-bottom: 1px solid #626363;
  width: calc(100% - 170px);
  margin-left: 58px;
  ${device.mobile} {
    margin-left: 15px;
    width: calc(100% - 85px);
    margin-bottom: 23px;
  }
`;

const CartContainer = styled.div`
  font-family: 'Archivo Narrow', sans-serif;
  padding-right: 20px;
  div {
    float: right;
    position: relative;
    top: -10px;
  }
  > a:nth-child(1) {
    display: block;
  }
  > a:nth-child(2) {
    display: none;
  }
  ${device.mobile} {
    div {
      top: -20px;
    }
    > a:nth-child(1) {
      display: none;
    }
    > a:nth-child(2) {
      display: block;
    }
  }
`;

const Cart = styled.div`
  width: 69px;
  height: 60px;
  background-image: url(${shoppingCartImg});
  background-size: cover;
  float: right;
  position: relative;
  top: -25px;
`;

const IndexPage = () => (
    <StaticQuery
      query={graphql`
        query{
          allProductsJson {
            edges {
              node {
                id,
                name,
                price,
                category,
                path
              }
            }
          }
        }
      `}
      render={data => {
          const products = data.allProductsJson.edges.map(edge => edge.node);
          return(
            <AppLayout>
              <Navbar />
              <Banner />
              <Container>
                <BreadCrumb>
                  <BreadCrumbItem>
                    {categories.find(c => c.id === CategoryState.current).name}
                  </BreadCrumbItem>
                </BreadCrumb>
              </Container>
              <CartContainer>
                <Link to="/carrito">
                  <CartCounter width={69} height={61} quantity={shoppingCart.counter}/>
                </Link>
                <Link to="/carrito">
                  <CartCounter width={36} height={32} quantity={shoppingCart.counter}/>
                </Link>
              </CartContainer>
              <Categories 
                categories={categories}
                products={products}/>
            </AppLayout>
          );
      }}
    />
);

export default observer(IndexPage);
