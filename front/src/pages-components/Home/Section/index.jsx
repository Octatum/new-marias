import React from 'react';
import styled from 'styled-components';
import device from './../../../utilities/device';

const Container = styled.section`
  overflow: visible;
  border-top: 1px solid #626363;
  width: 90%;
  padding-top: 30px;
  margin: 0 auto;
  margin-bottom: 100px;
  position: relative;
  ${device.mobile} {
    margin-bottom: 60px;
    padding-top: 15px;
  }
`;

const Title = styled.img`
  position: absolute;
  left: 0;
  top: 0;
  transform: translateY(-70%);
  background-color: #ffffff;
  height: 4rem;

  ${device.laptop} {
    height: 3rem;
  }

  ${device.tablet} {
    height: 2.5rem;
  }

  ${device.mobile} {
    height: 2rem;
  }
`;

const Section = props => {
  return (
    <Container>
      <Title src={props.titleSrc} alt={props.title} />
      {props.children}
    </Container>
  );
};
export default Section;
