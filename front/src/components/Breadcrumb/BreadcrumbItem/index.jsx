import React from 'react';
import styled from 'styled-components';
import GatsbyLink from 'gatsby-link';

const Span = styled(GatsbyLink)`
  color: inherit;
  text-transform: capitalize;
  text-decoration: none;
`;

const BreadcrumbItem = ({item}) => {
  return (
    <Span to={item.to}>
      {item.name}
    </Span>
  );
}

export default BreadcrumbItem;

