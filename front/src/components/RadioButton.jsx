import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 22px;
  width: 22px;
  .radio-container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .radio-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
  }

  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 22px;
    width: 22px;
    background-color: #ffffff;
    border-radius: 50%;
    border: 2px solid #c4c4c4;
    transition: all 0.1s ease-in;
  }

  .radio-container:hover input ~ .checkmark {
    background-color: #c4c4c4;
  }

  .radio-container input:checked ~ .checkmark {
    background-color: #c4c4c4;
  }

  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  .radio-container input:checked ~ .checkmark:after {
    display: block;
  }

  .radio-container .checkmark:after {
    top: 5px;
    left: 5px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
  }
`;

const RadioButton = ({ children, name }) => {
  return (
    <Container>
      <label className="radio-container">
        {' '}
        {children}
        <input type="radio" checked="checked" name={name} />
        <span className="checkmark" />
      </label>
    </Container>
  );
};

export default RadioButton;
