import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import CategoryDisplay from '../../components/Products/CategoryDisplay';

const IndexPage = ({ data }) => {
  const products = data.products.edges.map(({ node }) => ({
    ...node,
    slug: node.title,
    thumbnail: node.images[0].localFile.childImageSharp.fixed,
    price: node.priceRange.maxVariantPrice.amount,
  }));
  const breadcrumbItems = [
    {
      to: '/tienda',
      name: 'Todo',
    },
  ];

  return (
    <React.Fragment>
      <Helmet title="Todos los productos" />
      <CategoryDisplay breadcrumbItems={breadcrumbItems} products={products} />
    </React.Fragment>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    products: allShopifyProduct {
      edges {
        node {
          id
          title
          handle
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          images {
            id
            localFile {
              childImageSharp {
                fixed(width: 125) {
                  ...GatsbyImageSharpFixed_noBase64
                }
              }
            }
          }
        }
      }
    }
  }
`;
