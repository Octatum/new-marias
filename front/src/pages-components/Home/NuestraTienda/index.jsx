import React from 'react';
import Section from './../Section';
import NuestraTiendaImage from './../assets/nuestra-tienda.png';
import styled from 'styled-components';
import MunecaImage from './../assets/muneca.png';
import device from './../../../utilities/device';
import GatsbyLink from 'gatsby-link';
import Text from '../../../components/Text';

const Pictures = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 70%;
  margin: 49px auto;
  position: relative;
  ::before {
    position: absolute;
    left: calc(45.5%);
    top: calc(50% - 41px);
    display: block;
    content: '';
    width: 9%;
    padding-bottom: 11%;
    background-image: url('${MunecaImage}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    z-index: -1;
    ${device.mobile} {
      display: none;
    }
  }
  ${device.mobile} {
    flex-direction: column;
    align-items: center;
    margin: 20px auto;
  }
`;

const Picture = styled(GatsbyLink)`
  display: block;
  width: 44%;
  padding-bottom: 44%;
  background-color: #c4c4c4;
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  ${device.mobile} {
    width: 95%;
    padding-bottom: 95%;
    margin-bottom: 11px;
  }
`;

const NuestraTienda = props => {
  const { content, leftLink, rightLink } = props.data;

  return (
    <Section titleSrc={NuestraTiendaImage} title="Nuestra Tienda">
      <Text size={3} as="h2">
        {content}
      </Text>
      <Pictures>
        <Picture src={leftLink.image} to={leftLink.url} />
        <Picture src={rightLink.image} to={rightLink.url} />
      </Pictures>
    </Section>
  );
};
export default NuestraTienda;
