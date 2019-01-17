import React from 'react';
import { ErrorMessage, Field } from 'formik';
import styled from 'styled-components';

import Text from './Text';

const Label = styled('label')`
  display: flex;
  flex-direction: column;
`;

const InputField = styled(Field)`
  width: 100%;
  padding-left: 1em;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 1em;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.darkgray};
  border-radius: 0;
  height: 2em;

  ::placeholder {
    font-style: italic;
    opacity: 0.5;
  }
`;

const ErrorField = styled(ErrorMessage)`
  color: ${({ theme }) => theme.colors.red};
  font-family: 'Archivo Narrow', sans-serif;
  opacity: 0.8;
`;

const Input = props => {
  const { labelText, name, ...rest } = props;

  return (
    <Label>
      {labelText && <Text>{labelText}</Text>}
      <InputField name={name} {...rest} />
      <ErrorField component="p" name={name} />
    </Label>
  );
};

Input.defaultProps = {
  labelText: '',
};

export default Input;
