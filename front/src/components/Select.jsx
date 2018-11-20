import React from 'react';
import styled from 'styled-components';
import Text from './Text';
import { ErrorMessage } from 'formik';

const Option = styled('option')``;

const Label = styled('label')`
  display: flex;
  flex-direction: column;
`;

const ErrorField = styled(ErrorMessage)`
  color: ${({ theme }) => theme.colors.red};
  font-family: 'Archivo Narrow', sans-serif;
  opacity: 0.8;
`;

const SelectField = styled('select')`
  font-size: 18px;
  box-sizing: border-box;
  height: 2em;
  padding-left: 1em;
  font-family: 'Archivo Narrow', sans-serif;
  color: ${({ theme }) => theme.colors.darkgray};
  background: white;
`;

const PlaceholderOption = styled(Option)`
  opacity: 0.5;
  font-style: italic;
`;

const Select = props => {
  const {
    options,
    placeholder,
    setFieldValue,
    labelText,
    name,
    ...rest
  } = props;

  return (
    <Label>
      {labelText && <Text>{labelText}</Text>}
      <SelectField
        onChange={event => setFieldValue(name, event.target.value)}
        name={name}
        {...rest}
      >
        <PlaceholderOption value="" disabled>
          {placeholder}
        </PlaceholderOption>
        {options.map(option => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </SelectField>
      <ErrorField as={Text} component="p" name={name} />
    </Label>
  );
};

export default Select;
