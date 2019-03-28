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
      images {
        childImageSharp {
          fluid(maxWidth: 500, maxHeight: 500) {
            ...GatsbyImageSharpFluid_noBase64
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
