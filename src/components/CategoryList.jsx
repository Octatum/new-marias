import React from 'react';
import Link from 'gatsby-link';
import { StaticQuery, graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import Text from './Text';

import device from '../utilities/device';
import cleanString from '../utilities/cleanString';

const Ul = styled.ul`
  list-style: none;
  flex: 1;
  position: relative;

  > :not(:first-child) {
    padding-top: 0.5rem;
  }

  button {
    display: none;
    width: 19px;
    height: 42px;
    border: none;
    cursor: pointer;
  }
  transition: all 0.2s ease-in;
  ${device.mobile} {
    position: absolute;
    top: 0;
    left: ${({ hide }) => (hide ? '-100%' : 0)};
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(255, 255, 255, 0.9);
    box-sizing: border-box;
    padding-left: 15px;
    li {
      width: 120px;
    }
  }
`;

const TitleLi = styled(Text)`
  padding-bottom: 0.5rem;
`;

const CategoryLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
`;

const CategoryList = props => {
  const { hidden } = props;
  const data = useStaticQuery(graphql`
    query {
      categories: allShopifyProductType(sort: { fields: name }) {
        edges {
          node {
            shopifyId
            name
          }
        }
      }
    }
  `);

  const categories = data.categories.edges
    .map(({ node }) => ({
      cleanName: cleanString(node.name),
      ...node,
    }))
    .filter(category => category.cleanName !== 'otros');
  return (
    <Ul hide={hidden}>
      <TitleLi as="li" size={4} className="title">
        Categorías
      </TitleLi>
      {categories.map(category => (
        <Text as="li" key={category.shopifyId}>
          <CategoryLink to={`/tienda/categoria/${category.cleanName}`} replace>
            {category.name.toLowerCase()}
          </CategoryLink>
        </Text>
      ))}
      <Text as="li">
        <CategoryLink to={`/tienda/categoria/otros`}>
          {'Otros'.toLowerCase()}
        </CategoryLink>
      </Text>
    </Ul>
  );
};

export default CategoryList;
