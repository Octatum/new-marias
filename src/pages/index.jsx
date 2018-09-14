import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import shoppingCartImg from '../components/Detail/assets/shoppingcart.png';
import Categories from '../components/Products/Categories';

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
`;

const Container = styled.div`
  padding-top: 12.2px;
  border-bottom: 2px solid #d6d8db;
  width: 90%;
  margin-left: 58px;
`;

const Breadcrumb = styled.ul`
  list-style: none;
  color: #626363;
  font-size: 20px;
  font-family: 'Archivo Narrow', sans-serif;
  display: inline-block;
`;

const Cart = styled.div`;
    width: 69px;
    height: 60px;
    font-family: 'Archivo Narrow', sans-serif;
    background-image: url(${shoppingCartImg});
    background-size: cover;
    float: right;
`

const IndexPage = () => (
  <AppLayout>
    <Navbar />
    <Banner />
    <Container>
      <Breadcrumb>
        <li>Todas   ></li>
      </Breadcrumb>
    </Container>
    <Categories />
  </AppLayout>
)

export default IndexPage
