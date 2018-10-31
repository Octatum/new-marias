import React from 'react';
import { observer } from 'mobx-react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import CategoryDisplay from '../components/Products/CategoryDisplay';

const IndexPage = ({ data }) => {
  const products = data.products.edges.map(({ node }) => ({
    slug: node.fields.slug,
    thumbnail: node.entry.thumbnail.path,
    ...node.entry,
    ...node,
  }));
  const breadcrumbItems = [
    {
      to: '/',
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

export default observer(IndexPage);

export const query = graphql`
  query {
    products: allCockpitProduct {
      edges {
        node {
          id
          fields {
            slug
          }
          entry {
            name
            price
            thumbnail {
              path
            }
          }
        }
      }
    }
  }
`;
