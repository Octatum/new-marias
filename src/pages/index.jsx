import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';
import Layout from '../components/layout';
import Navbar from '../components/Navbar';
import Categories from '../components/Products/Categories';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const Banner = styled.div`
  width: 1440px;
  height: 217px;
  background-color: #d6d8db;
`;

const IndexPage = () => (
  <AppLayout>
    <Navbar />
    <Banner />
    <Categories />
  </AppLayout>
)

export default IndexPage
