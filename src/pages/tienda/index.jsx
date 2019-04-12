import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import CategoryDisplay from '../../components/Products/CategoryDisplay';

const IndexPage = ({ data }) => {
  const products = data.products.edges.map(({ node }) => ({
    ...node,
    slug: node.slug,
    thumbnail: node.mainImage.childImageSharp.fixed,
    price: node.price[0].amount,
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
    products: allMoltinProduct(filter: { mainImageHref: { ne: null } }) {
      edges {
        node {
          id
          name
          slug
          description
          price {
            amount
          }
          mainImage {
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
`;
