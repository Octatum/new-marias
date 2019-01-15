import React from 'react';
import styled from 'styled-components';
import device from './../../../utilities/device';

const Layout = styled.div`
  color: white;
  position: relative;
`;

const Img = styled.img`
  width: 100%;
  height: 35vw;

  ${device.tablet} {
    height: auto;
  }
`;

const CustomSlide = props => {
  const { image } = props;
  return (
    <Layout>
      <Img src={image} />
    </Layout>
  );
};

export default CustomSlide;
