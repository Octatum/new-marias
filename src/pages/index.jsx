import React from 'react'
import styled from 'styled-components';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import shoppingCartImg from '../components/Detail/assets/shoppingcart.png';
import Categories from '../components/Products/Categories';
import CategoryState from "./../CategoryState";
import {observer} from 'mobx-react';
import {ALEBRIJES, BOLSAS, CAJAS, DECORACION, 
    MOLCAJETES, TORTILLEROS, categories} from "./../constants/categories.js"

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

const products = [
  {id: 1, name: "Jarrón de porcelana china", price: 800, category: ALEBRIJES},
  {id: 2, name: "Jarrón de porcelana china", price: 800, category: TORTILLEROS},
  {id: 3, name: "Jarrón de porcelana china", price: 200, category: DECORACION},
  {id: 4, name: "Jarrón de porcelana china", price: 800, category: MOLCAJETES},
  {id: 5, name: "Jarrón de porcelana china", price: 800, category: BOLSAS},
  {id: 6, name: "Jarrón de porcelana china", price: 800, category: CAJAS},
  {id: 7, name: "Jarrón de porcelana china", price: 200, category: DECORACION},
  {id: 8, name: "Jarrón de porcelana china", price: 800, category: CAJAS},
  {id: 9, name: "Jarrón de porcelana china", price: 200, category: BOLSAS}
];

const IndexPage = () => (
  <AppLayout>
    <Navbar />
    <Banner />
    <Container>
      <Breadcrumb>
        <li>{categories.find(c => c.id === CategoryState.current).name}></li>
      </Breadcrumb>
    </Container>
    <Categories 
      categories={categories}
      products={products} />
  </AppLayout>
)

export default observer(IndexPage);
