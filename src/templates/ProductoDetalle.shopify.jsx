import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import ProductDetailContainer from '../pages-components/ProductDetail/Shopify';
import AppLayout from '../components/AppLayout';

function Producto(props) {
  const productName = props.data.shopifyProduct.title;

  return (
    <AppLayout>
      <Helmet title={productName} />
      <ProductDetailContainer {...props} />
    </AppLayout>
  );
}

export default Producto;

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      title
      id
      fields {
        mainCategory
      }
      priceRange {
        maxVariantPrice {
          amount
        }
      }
      images {
        originalSrc
      }
      productType
      variants {
        title
        price
        image {
          originalSrc
        }
        availableForSale
      }
      description
      options {
        values
      }
    }
  }
`;
