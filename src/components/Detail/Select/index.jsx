import React from 'react';
import styled from 'styled-components';
import arrow from './assets/selectArrow.png';
import arrowUp from './assets/selectArrowUp.png';
import device from './../../../utilities/device';

const Container = styled.div`
    font-family: 'Archivo Narrow', sans-serif;
    font-size: 12px;
    color: #626363;
    margin: 4px 0;
    label {
        font-size: 14px;
        display: block;
    }
    select {
        color: #626363;
        width: 100%;
        margin-top: 7px;
        font-size: 12px;
    }

    ${device.mobile} {

        position: relative;
        ::after {
            position: absolute;
            top: 7px;
            left: 9px;
            content: "${props => props.name}";
        }

        label {
            display: none;
        }

        select {
            border: 1px solid #626363;
            padding: 25px 9px 5px 9px;
            appearance: none;
            font-size: 24px;
            background-color: transparent;
            background: url(${arrow}) no-repeat right;
            position: relative;
            margin: 0;
        }

      /*  select:focus {
            background: url(${arrowUp}) no-repeat right;
        } */

    }
`;
const Select = ({ name, children, onChange }) => (
  <Container name={name}>
    <label>{name}</label>
    <select onChange={e => onChange(e)}>{children}</select>
  </Container>
);
export default Select;
