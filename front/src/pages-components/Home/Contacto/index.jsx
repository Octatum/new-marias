import React from 'react';
import Section from './../Section';
import styled from 'styled-components';
import ContactoImage from './../assets/contacto.svg';
import Sucursal from './Sucursal';
import FacebookIcon from './../assets/fbpink.svg';
import InstagramIcon from './../assets/igpink.svg';
import ContactForm from './../ContactForm';
import device from './../../../utilities/device';
import Text from '../../../components/Text';
import { navbarIds } from '../../../components/Navbar';

const Sucursales = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin: 0 auto;
  > div {
    width: 41%;
  }
  ${device.mobile} {
    flex-direction: column;
    > div {
      width: 100%;
      margin-bottom: 30px;
    }
  }
`;

const Icons = styled.div`
  width: 18%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${device.mobile} {
    display: none;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  margin: 12.5px 0;
  cursor: pointer;
`;

const Contacto = props => {
  const [leftLocation, rightLocation] = props.data;

  return (
    <Section titleSrc={ContactoImage} title="Contacto">
      <div style={{position: 'absolute', top: '-12rem'}} id={navbarIds.contacto} />
      <Text size={3} as="h2">
        Sucursales
      </Text>
      <Sucursales>
        <Sucursal
          name={leftLocation.name}
          address={leftLocation.content}
          coordinates={leftLocation.coords}
        />
        <Icons>
          <Icon src={FacebookIcon} />
          <Icon src={InstagramIcon} />
        </Icons>
        <Sucursal
          name={rightLocation.name}
          address={rightLocation.content}
          coordinates={rightLocation.coords}
        />
      </Sucursales>
      <ContactForm />
    </Section>
  );
};
export default Contacto;
