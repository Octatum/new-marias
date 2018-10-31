import React from 'react';
import styled from 'styled-components';
import device from '../../utilities/device';

const Container = styled.div`
  width: 38px;
  height: 38px;
  border: 2px solid #d4ad9f;
  position: absolute;
  top: 19px;
  right: 15px;
  span {
    width: 80%;
    height: 2px;
    background-color: #d4ad9f;
    margin: 2px auto;
  }
  :hover {
    cursor: pointer;
  }

  display: none;
  ${device.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const BurgerButtton = ({ onClick }) => {
  return (
    <Container onClick={onClick}>
      <span />
      <span />
      <span />
      <span />
    </Container>
  );
};
export default BurgerButtton;
