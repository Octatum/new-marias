import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';
import forwardButtonImg from './assets/forwardButton.svg';
import device from './../../utilities/device';
import GatsbyLink from 'gatsby-link';
import Text from '../Text';

const Container = styled(Flex)`
  font-family: ${({ theme }) => theme.fonts.main};
  border-bottom: 1px solid #626363;

  ${device.mobile} {
    > :first-child {
      padding-left: 1rem;
    }
  }
`;

const BreadcrumbItem = styled(Flex)`
  font-size: 20px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  text-decoration: none;

  > * {
    margin-right: 0.6rem;
  }
`;

const Img = styled('img')`
  display: block;
  height: 0.6rem;
`;

const TextLink = styled(Text)`
  text-decoration: none;
`;

const Breadcrumbs = props => {
  const { links } = props;

  return (
    <Container mx={3} pb={2}>
      {links &&
        links.map(({ name, to = '' }) => {
          let linkProps = {
            as: 'div',
          };
          if (to !== '') {
            linkProps = {
              to,
              as: GatsbyLink,
            };
          }
          return (
            <BreadcrumbItem alignItems="center" key={name}>
              <TextLink {...linkProps}>{name}</TextLink>
              <Img src={forwardButtonImg} />
            </BreadcrumbItem>
          );
        })}
    </Container>
  );
};
export default Breadcrumbs;
