import React from 'react';
import Section from './../Section';
import styled from 'styled-components';
import QuienesSomosImage from './../assets/quienes-somos.svg';
import device from './../../../utilities/device';
import { withTextStyle } from '../../../components/Text';
import ReactMarkdown from 'react-markdown';
import { navbarIds } from '../../../components/Navbar';

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

const Content = styled(withTextStyle(ReactMarkdown))`
  > p {
    display: flex;
  }
  img {
    max-height: 3rem;
  }
`;

const QuienesSomos = props => {
  const { banner, content } = props.data;

  return (
    <div>
      <Section titleSrc={QuienesSomosImage} id={navbarIds.quienesSomos} title="Quienes Somos">
        <Banner src={banner} />
        <Content size={2} source={content} />
      </Section>
    </div>
  );
};
export default QuienesSomos;
