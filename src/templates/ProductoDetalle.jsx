import React from 'react';
import ProductDetailContainer from '../pages-components/ProductDetail';
import { graphql } from 'gatsby';

function Producto(props) {
  return <ProductDetailContainer {...props} />;
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
