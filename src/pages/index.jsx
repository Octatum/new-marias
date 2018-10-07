import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
import { observer } from 'mobx-react';
import { StaticQuery, graphql } from 'gatsby';
import Navbar from '../components/Navbar';
import shoppingCartImg from '../components/Detail/assets/shoppingcart.svg';
import Categories from '../components/Products/Categories';
import CategoryState from './../CategoryState';
import { categories } from './../constants/categories.js';
import './../components/setup.css';

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
`;

const Container = styled.div`
  padding-top: 12.2px;
  border-bottom: 2px solid #d6d8db;
  width: 88%;
  margin-left: 58px;
`;

const Breadcrumb = styled.ul`
  list-style: none;
  color: #626363;
  font-size: 20px;
  font-family: 'Archivo Narrow', sans-serif;
  display: inline-block;
`;

const CartContainer = styled.div`
  font-family: 'Archivo Narrow', sans-serif;
  padding-right: 20px;
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
                <Breadcrumb>
                  <li>{categories.find(c => c.id === CategoryState.current).name}></li>
                </Breadcrumb>
              </Container>
              <CartContainer>
                <Link to="/carrito">
                  {' '}
                  <Cart />{' '}
                </Link>
              </CartContainer>
              <Categories categories={categories} products={products} />
            </AppLayout>
          );
      }}
    />
);

export default observer(IndexPage);
