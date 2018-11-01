import React from 'react';
import Link from 'gatsby-link';
import { StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';

import device from '../utilities/device';

const Ul = styled.ul`
  list-style: none;
  color: #626363;
  font-family: 'Archivo Narrow', sans-serif;
  flex: 1;
  li.title {
    font-size: 28px;
    padding-bottom: 6px;
  }
  li {
    font-size: 18px;
    padding-top: 9px;
  }
  li:hover {
    cursor: pointer;
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
      <li className="title">Categorías</li>
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
            <li key={category.id}>
              <CategoryLink to={`/categoria/${category.cleanName}`}>
                {category.name.toLowerCase()}
              </CategoryLink>
            </li>
          ));
        }}
      />
    </Ul>
  );
};

export default CategoryList;
