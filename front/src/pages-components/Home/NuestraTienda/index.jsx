import React from 'react';
import Section from './../Section';
import NuestraTiendaImage from './../assets/nuestra-tienda.png';
import styled from 'styled-components';
import MunecaImage from './../assets/muneca.png';
import device from './../../../utilities/device';

const H2 = styled.h2`
  margin-top: 25px;
`;

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
        margin-bottom: 0;
    }
`;
const Picture = styled.div`
  display: block;
  width: 44%;
  padding-bottom: 44%;
  background-color: #c4c4c4;
  background-image: url(${({ src }) => src});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  :hover {
    cursor: pointer;
  }
  ${device.mobile} {
    width: 95%;
    padding-bottom: 95%;
    margin-bottom: 11px;
  }
`;

const NuestraTienda = () => {
  return (
    <Section titleSrc={NuestraTiendaImage} titleWidth={'286px'}>
      <H2>
        Visita nuestra tienda en línea y conoce los productos que tenemos para
        ti
      </H2>
      <Pictures>
        <Picture />
        <Picture />
      </Pictures>
    </Section>
  );
};
export default NuestraTienda;
