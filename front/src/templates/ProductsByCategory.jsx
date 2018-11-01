import React from 'react';
import { graphql } from 'gatsby';
import CategoryDisplay from '../components/Products/CategoryDisplay';

const ProductsByCategory = ({data}) => {
  const products = data.products.edges.map(({ node }) => ({
    slug: node.fields.slug,
    thumbnail: node.entry.thumbnail.path,
    ...node.entry,
    ...node,
  }));
  
  const breadcrumbItems = [{
    to: "/",
    name: "Todo"
  }, {
    to: `/categoria/${data.category.fields.cleanName}`,
    name: data.category.entry.name
  }];

  return (
    <CategoryDisplay 
      breadcrumbItems={breadcrumbItems} 
      products={products} 
    />
  );
};

export default ProductsByCategory;

export const query = graphql`
  query ProductsByCategoryId($categoryId: String!) {
    products: allCockpitProduct (
      filter: {entry: {category_id: {_id: {eq: $categoryId}}}}
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

    category: cockpitCategory (id: {eq: $categoryId}) {
      fields {
        cleanName
      }
      entry {
        name
      }
    }
  }
`;
