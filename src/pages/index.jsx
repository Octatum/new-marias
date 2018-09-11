import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Layout from '../components/layout';

const AppLayout = styled.div`
  display: flex;
  flex-direction: column;
`;

const IndexPage = () => (
  <AppLayout>
    <Navbar />
  </AppLayout>
)

export default IndexPage
