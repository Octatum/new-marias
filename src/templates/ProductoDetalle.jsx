import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import ProductDetailContainer from '../pages-components/ProductDetail';
import toTitleCase from '../utilities/toTitleCase';

function Producto(props) {
  const productName = props.data.moltinProduct.name;

  return (
    <>
      <Helmet title={toTitleCase(productName)} />
      <ProductDetailContainer {...props} />
    </>
  );
}

export default Producto;

export const query = graphql`
  fragment productData on MoltinProduct {
    id
    name
    sku
    files {
      href
    }
  }

  query($slug: String!) {
    moltinProduct(slug: { eq: $slug }) {
      id
      name
      sku
      price {
        amount
      }
      description
      children {
        ...productData
      }
      categories {
        name
      }
      fields {
        mainCategory
      }
      files {
        href
      }
      meta {
        variations {
          name
          id
        }
      }
      relationships {
        parent {
          data {
            id
          }
        }
      }
      mainImage {
        childImageSharp {
          original {
            src
          }
        }
      }
    }
  }
`;
