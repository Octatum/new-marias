import React from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import CategoryDisplay from '../components/Products/CategoryDisplay';
import cleanString from '../utilities/cleanString';
import { toUrlCase } from '../utilities/lib';

function toTitleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(' ');
}

const ProductsByCategory = props => {
  const {
    data,
    pageContext: { categoryName },
  } = props;

  const productsList = data.products || {};
  const productEdges = productsList.edges || [];
  const products = productEdges.map(({ node }) => ({
    ...node,
    thumbnail: node.images[0].localFile.childImageSharp.fixed,
    price: node.priceRange.minVariantPrice.amount,
    url: node.handle,
  }));

  console.info(products);
  const cleanCategoryName = cleanString(categoryName);
  const breadcrumbItems = [
    {
      to: '/tienda',
      name: 'Todo',
    },
    {
      to: `/tienda/categoria/${cleanCategoryName}`,
      name: categoryName,
    },
  ];

  return (
    <React.Fragment>
      <Helmet title={toTitleCase(categoryName)} />
      <CategoryDisplay breadcrumbItems={breadcrumbItems} products={products} />
    </React.Fragment>
  );
};

export default ProductsByCategory;

export const query = graphql`
  query ShopifyProductsByCategoryName($categoryName: String!) {
    products: allShopifyProduct(
      filter: { fields: { mainCategory: { eq: $categoryName } } }
    ) {
      edges {
        node {
          title
          handle
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images {
            localFile {
              childImageSharp {
                fixed(width: 125) {
                  ...GatsbyImageSharpFixed_noBase64
                }
              }
            }
            originalSrc
          }
        }
      }
    }
  }
`;
