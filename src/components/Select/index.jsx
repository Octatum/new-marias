import React from 'react';
import styled from 'styled-components';
import arrow from './assets/selectArrow.png';
import device from '../../utilities/device';
import Text from '../Text';

const Label = styled.label`
  margin: 4px 0;

  ${device.tablet} {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0.5em;
    border: 1px solid ${({ theme }) => theme.colors.darkgray};
  }
`;

const SelectInput = styled('select')`
  color: ${({ theme }) => theme.colors.darkgray};
  width: 100%;
  margin-top: 7px;
  font-size: 12px;

  ${device.tablet} {
    appearance: none;
    border: none;
    font-size: 1.5em;
    background-color: transparent;
    background: url(${arrow}) no-repeat;
    background-position: right;
    margin: 0;
  }
`;

// padding: 25px 9px 5px 9px;

const Select = ({ name, children, onChange }) => (
  <Label name={name}>
    <Text as="p">{name}</Text>
    <SelectInput onChange={e => onChange(e)}>{children}</SelectInput>
  </Label>
);
export default Select;
