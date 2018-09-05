import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Section from '../components/Section';
import Header from '../components/Header/index';

const SecondPage = () => (
  <Layout>
    <Section fluid>
      <Header>Hi from the second page</Header>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Section>
  </Layout>
)

export default SecondPage
