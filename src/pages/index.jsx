import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
// React importa el index automaticamente. No es necesario hacerlo explicito.
import Header from '../components/Header';
import Section from '../components/Section';

const IndexPage = () => (
  <Layout>
    <Section>
      <Header>Hello there!</Header>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to="/page-2/">Go to page 2</Link>
    </Section>
  </Layout>
)

export default IndexPage
