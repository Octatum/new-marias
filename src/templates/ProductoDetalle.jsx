import React from 'react';
import Helmet from 'react-helmet';
import ProductDetailContainer from '../pages-components/ProductDetail';
import AppLayout from '../components/AppLayout';

function Producto(props) {
  const productName = props.data.moltinProduct.name;

  return (
    <AppLayout>
      <Helmet title={productName} />
      <ProductDetailContainer {...props} />
    </AppLayout>
  );
}

export default Producto;
