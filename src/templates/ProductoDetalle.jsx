import React from 'react';
import ProductDetailContainer from '../pages-components/ProductDetail';
import { graphql } from 'gatsby';

function Producto(props) {
  return <ProductDetailContainer {...props} />;
}

export default Producto;

export const query = graphql`
  query($slug: String!) {
    cockpitProduct(fields: { slug: { eq: $slug } }) {
      id
      entry {
        name
        price
        description
        category_id {
          display
        }
        thumbnail {
          path
        }
        # gallery {
        #   value {
        #     color
        #     images {
        #       path
        #     }
        #   }
        # }
      }
    }
  }
`;
