import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import ProductDetailContainer from '../pages-components/ProductDetail';
import toTitleCase from '../utilities/toTitleCase';
import AppLayout from '../components/AppLayout';

function Producto(props) {
  const productName = props.data.moltinProduct.name;

  return (
    <AppLayout>
      <Helmet title={toTitleCase(productName)} />
      <ProductDetailContainer {...props} />
    </AppLayout>
  );
}

export default Producto;
