import React from 'react';
import styled from 'styled-components';
import device from './../../../utilities/device';

const Container = styled.section`
  overflow: visible !important;
  border-top: 1px solid #626363;
  width: 90%;
  padding-top: 30px;
  margin: 0 auto;
  margin-bottom: 100px;
  position: relative;
  h2 {
    font-size: 30px;
    color: #626363;
    font-family: 'Archivo Narrow', sans-serif;
  }
  p {
    font-family: 'Archivo Narrow', sans-serif;
    color: #626363;
    font-size: 20px;
  }
  ${device.mobile} {
    margin-bottom: 60px;
    padding-top: 15px;
    h2 {
      font-size: 16px;
      font-weight: bold;
    }
    p {
      font-size: 16px;
    }
  }
`;

const Title = styled.img`
  position: absolute;
  left: 0;
  top: -30px;
  background-color: #ffffff;
  height: 50px;
  ${device.mobile} {
    height: 25px;
    top: -17px;
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
