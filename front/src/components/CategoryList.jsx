import React from 'react';
import Link from 'gatsby-link';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import Text from './Text';

import device from '../utilities/device';

const Ul = styled.ul`
  list-style: none;
  flex: 1;

  > :not(:first-child) {
    padding-top: 0.5rem;
  }

  button {
    display: none;
    width: 19px;
    height: 42px;
    border: none;
    :hover {
      cursor: pointer;
    }
  }
  transition: all 0.2s ease-in;
  ${device.mobile} {
    position: absolute;
    left: ${({ hide }) => (hide ? '-45%' : '0')};
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
  text-transform: capitalize;
`;

const CategoryList = props => {
  const { hidden } = props;
  return (
    <Ul hide={hidden}>
      <TitleLi as="li" size={4} className="title">
        Categorías
      </TitleLi>
      <StaticQuery
        query={graphql`
          query {
            categories: allCockpitCategory(sort: { fields: entry___name }) {
              edges {
                node {
                  id
                  fields {
                    cleanName
                  }
                  entry {
                    name
                  }
                }
              }
            }
          }
        `}
        render={data => {
          const categories = data.categories.edges.map(({ node }) => ({
            name: node.entry.name,
            cleanName: node.fields.cleanName,
            ...node,
          }));

          return categories.map(category => (
            <Text as="li" key={category.id}>
              <CategoryLink to={`/tienda/categoria/${category.cleanName}`}>
                {category.name.toLowerCase()}
              </CategoryLink>
            </Text>
          ));
        }}
      />
    </Ul>
  );
};

export default CategoryList;
