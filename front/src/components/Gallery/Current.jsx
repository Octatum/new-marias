import React from 'react';
import styled from 'styled-components';
import device from '../../utilities/device';

const Container = styled.div`
  padding: 7px 0;
  border: 1px solid transparent;
  display: none;

  ${device.tablet} {
    grid-area: dots;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const Dot = styled.span`
  box-sizing: border-box;
  height: 14px;
  width: 14px;
  margin: 0 8px;
  border: ${({ active }) => (active ? '3px solid #d6d8db' : 'none')};
  background-color: ${({ active }) => (active ? '#fff' : '#d6d8db')};
  border-radius: 50%;
`;

const Current = ({ dots, style }) => {
  let dotsList = dots.map((active, index) => (
    <Dot key={index} active={active} />
  ));
  return <Container style={style}>{dotsList}</Container>;
};
export default Current;
