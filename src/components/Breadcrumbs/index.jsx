import React from 'react';
import styled from 'styled-components';
import forwardButtonImg from './assets/forwardButton.svg';
import device from './../../utilities/device';
import GatsbyLink from 'gatsby-link';
import Text from '../Text';

const Container = styled.div`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.main};
  box-sizing: border-box;
  border-bottom: 1px solid #626363;

  ${device.mobile} {
    margin: 0 0.5rem;

    > :first-child {
      padding-left: 1rem;
    }
  }
`;

const BreadcrumbItem = styled.span`
  display: inline-flex;
  align-items: center;

  margin-bottom: 4px;
  position: relative;
  font-size: 20px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  text-decoration: none;

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
            <BreadcrumbItem key={name}>
              <TextLink {...linkProps}>{name.toLowerCase()}</TextLink>
              <Img src={forwardButtonImg} />
            </BreadcrumbItem>
          );
        })}
    </Container>
  );
};
export default Breadcrumbs;
