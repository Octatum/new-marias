import React from 'react';
import styled from 'styled-components';
import QuienesSomosImage from './assets/quienes-somos.svg';
import device from '../../utilities/device';
import { withTextStyle } from '../../components/Text';
import ReactMarkdown from 'react-markdown';
import { navbarIds } from '../../components/Navbar';

const Banner = styled.div`
  height: 320px;
  margin-bottom: 30px;
  background-color: #c94545;
  background-image: url('${({ src }) => src}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top center;
  ${device.tablet} {
    margin-bottom: 10px;
    height: 30vh;
  }
`;

const Content = styled(withTextStyle(ReactMarkdown))`
  width: 90%;
  margin: 0 auto;

  > p {
    display: flex;
  }

  img {
    max-height: 4rem;
  }
`;

const Div = styled('div')`
  position: absolute;
  top: -10rem;

  ${device.mobile} {
    top: -7rem;
  }
`;

const Section = styled('section')`
  display: flex;
  flex-direction: column;
  margin-bottom: 5rem;
  position: relative;
  justify-content: center;
`;

const Header = styled('div')`
  width: 90%;
  margin: 0 auto;
  height: 3rem;
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  ${device.mobile} {
    height: 1.5rem;
  }
  ${device.tablet} {
    height: 2rem;
  }

  ${device.laptop} {
    height: 2.5rem;
  }
`;

const Image = styled('img')``;

const BlackLine = styled('div')`
  height: 1px;
  flex: 1;
  background-color: ${({ theme }) => theme.colors.darkgray};
`;

const QuienesSomos = props => {
  const { banner, content } = props.data;

  return (
    <Section>
      <Div id={navbarIds.quienesSomos} />
      <Header>
        <Image src={QuienesSomosImage} />
        <BlackLine />
      </Header>
      <Banner src={banner} />
      <Content size={2} source={content} />
    </Section>
  );
};
export default QuienesSomos;
