import React from 'react';
import Section from './../Section';
import styled from 'styled-components';
import QuienesSomosImage from './../assets/quienes-somos.png';
import device from './../../../utilities/device';
import Text from '../../../components/Text';

const Banner = styled.div`
  width: 100vw;
  height: 300px;
  margin-left: -7%;
  margin-bottom: 30px;
  background-color: #c94545;
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  ${device.mobile} {
    margin-bottom: 10px;
  }
`;

const QuienesSomos = props => {
  const { banner, content } = props.data;

  return (
    <div>
      <Section titleSrc={QuienesSomosImage} title="Quienes Somos">
        <Banner src={banner} />
        <Text size={2} as="p">
          {content}
        </Text>
      </Section>
    </div>
  );
};
export default QuienesSomos;
