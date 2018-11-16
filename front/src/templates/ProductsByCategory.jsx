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

const ProductsByCategory = ({ data }) => {
  const products = data.products.edges.map(({ node }) => ({
    slug: node.fields.slug,
    thumbnail: node.entry.thumbnail.path,
    ...node.entry,
    ...node,
  }));
  const breadcrumbItems = [
    {
      to: '/tienda',
      name: 'Todo',
    },
    {
      to: `/tienda/categoria/${data.category.fields.cleanName}`,
      name: data.category.entry.name,
    },
  ];

  return (
    <React.Fragment>
      <Helmet title={toTitleCase(data.category.entry.name)} />
      <CategoryDisplay breadcrumbItems={breadcrumbItems} products={products} />
    </React.Fragment>
  );
};

export default ProductsByCategory;

export const query = graphql`
  query ProductsByCategoryId($categoryId: String!) {
    products: allCockpitProduct(
      filter: { entry: { category_id: { _id: { eq: $categoryId } } } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          entry {
            name
            price
            description
            thumbnail {
              path
            }
          }
        }
      }
    }

    category: cockpitCategory(id: { eq: $categoryId }) {
      fields {
        cleanName
      }
      entry {
        name
      }
    }
  }
`;
