import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import CategoryDisplay from '../components/Products/CategoryDisplay';

function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

const ProductsByCategory = props => {
  const { data } = props;
  const productsList = data.products || {};
  const productEdges = productsList.edges || [];
  const products = productEdges.map(({ node }) => ({
    ...node,
    thumbnail: node.mainImage.childImageSharp.fixed,
    price: node.price[0].amount,
  }));
  const breadcrumbItems = [
    {
      to: '/tienda',
      name: 'Todo',
    },
    {
      to: `/tienda/categoria/${data.category.name}`,
      name: data.category.name,
    },
  ];

  return (
    <React.Fragment>
      <Helmet title={toTitleCase(data.category.name)} />
      <CategoryDisplay breadcrumbItems={breadcrumbItems} products={products} />
    </React.Fragment>
  );
};

export default ProductsByCategory;

export const query = graphql`
  query ProductsByCategoryId($categoryId: String!) {
    products: allMoltinProduct {
      edges {
        node {
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

    category: moltinCategory(id: { eq: $categoryId }) {
      name
    }
  }
`;
