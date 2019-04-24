import React from 'react';
import ProductDetailContainer from '../pages-components/ProductDetail';
import { graphql } from 'gatsby';

function Producto(props) {
  return <ProductDetailContainer {...props} />;
}

export default Producto;

export const query = graphql`
  query($slug: String!) {
    moltinProduct(slug: { eq: $slug }) {
      id
      name
      price {
        amount
        currency
        includes_tax
      }
      description
      categories {
        name
      }
      fields {
        mainCategory
      }
      files {
        href
      }
      relationships {
        parent {
          data {
            id
          }
        }
        variations {
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
