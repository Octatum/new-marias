import React, { Fragment } from 'react';
import styled from 'styled-components';
import forwardButtonImg from './assets/forwardbutton.png';
import device from './../../utilities/device';
import GatsbyLink from 'gatsby-link';
import Text from '../Text';

const Container = styled.div`
  width: 100%;
  font-family: 'Archivo Narrow', sans-serif;
  box-sizing: border-box;
  border-bottom: 1px solid ${({theme}) => theme.colors.darkgray};
  
  ${device.mobile} {
    margin: 0;
  }
`;

const BreadcrumbItem = styled.span`
  display: inline-block;
  margin-bottom: 4px;
  position: relative;
  font-size: 20px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  text-decoration: none;
  text-transform: capitalize;

  > * {
    margin-right: 1rem;
  }
`;

const Img = styled('img')`
  max-height: 100%;
  color: black;
  height: 0.5em;
`;

const TextLink = styled(Text)`
  text-decoration: none;
`;

const Breadcrumbs = props => {
  const { links } = props;

  return (
    <Container>
      {links &&
        links.map(link => (
          <BreadcrumbItem key={link.name}>
            <TextLink to={link.to} as={link.to ? GatsbyLink : 'p'}>{link.name.toLowerCase()}</TextLink>
            <Img src={forwardButtonImg} />
          </BreadcrumbItem>
        ))}
    </Container>
  );
};
export default Breadcrumbs;
